import { useState } from "react";
import axios from "axios";
import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import { GetServerSideProps } from "next";

const TicketPage = ({ widgetHTML }: { widgetHTML: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="d-none d-lg-block">
        <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
      </div>
      <div className="d-block d-lg-none text-center">
        {show && <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />}
        <button
          className="btn btn-sm btn-light mt-2"
          onClick={() => setShow((s) => !s)}>
          {show ? "Hide Map " : "Show Map "}
          {show ? <BsArrowsAngleContract /> : <BsArrowsFullscreen />}
        </button>
      </div>

      {/* Render the widgetHTML */}

      {/* Rest of your ticket results page content */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventID = context.params?.eventID;
  const userAgent = "something";
  const WBCID = 4626;

  const response = await axios.get(
    `https://mapwidget3.seatics.com/html?eventId=${eventID}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  );

  const widgetHTML = response.data;
  const additionalScript = `
    <script>
      Seatics.config.enableQuantityModal = true;
      Seatics.config.mapContained = true;
      Seatics.config.c3CheckoutDomain = "checkout.ticketjewel.com";
      Seatics.config.c3CurrencyCode = "USD";
      Seatics.config.useC3 = true;
      Seatics.config.currencyIntl = {};
      Seatics.config.enableLegalDisclosureMobile = false;
      Seatics.config.enableHeaderLegalDisclosureMobile = true;
                     Seatics.config.skipPrecheckoutDesktop = true; 
               Seatics.config.skipPrecheckoutMobile = true;
                Seatics.config.buyButtonContentHtml = '<button class="btn-buy venue-ticket-list-checkout-trigger-js">Continue</button>';
                Seatics.config.tgGuaranteeNoteHtml = '';
                Seatics.config.tgMarkTooltipText = 'These tickets are featured as a great value.';
Seatics.config.enableHeaderLowerLegalDisclosureMobile = false; 
Seatics.config.eventInfoLeftCol = '',
                Seatics.config.eventInfoRightCol = '',
                Seatics.config.zoomOnSelection = !1,
                Seatics.config.showZoomControls = true,                           
                Seatics.config.ticketListOnRight = true;	
    			Seatics.config.enableListMarketingMobile = false; 
    			Seatics.config.smallScreenMapLayout = Seatics.SmallScreenMapOptions.FullyHidden;
    			Seatics.config.legendExpanded = false; 
    			Seatics.config.enableFeedBack = false; 
    			Seatics.config.enableMapMarketing = false;
    			Seatics.config.enableListMarketingDesktop = false;
 Seatics.config.mapFinishedRenderingHandler = function(){
                    $('#tn-maps').addClass('completed');                
                    Seatics.config.ticketSeparationOptions = {
                      packages: Seatics.TicketGroupSeparationOptions.Separate,
                      parking: Seatics.TicketGroupSeparationOptions.Separate,
                      passes: Seatics.TicketGroupSeparationOptions.Separate,
                      hotels: Seatics.TicketGroupSeparationOptions.Separate,
                      unmappedFlex: Seatics.TicketGroupSeparationOptions.Separate,
                      unmappedStandard: Seatics.TicketGroupSeparationOptions.Separate
                    };
                
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    console.log("dsd");
                    setTimeout(function(){ $("#list-ctn").css({ top: '96px' }); }, 900);
                    
}
                  };
                   $(document).ready(function(){
        $(document).on('click','#map-shower',function(e){
            e.pre
            console.log("s");
            if ( $(".sea-show-zoom-controls-mobile").css('display') == 'none' ){
    $("#list-ctn").css({ top: '355px' });
}else{
    $("#list-ctn").css({ top: '96px' });
}
            $(".sea-show-zoom-controls-mobile").toggle();
            
        });
    });
    </script>
  `;

  const updatedWidgetHTML = widgetHTML.replace(
    "</head>",
    `${additionalScript}</head>`
  );

  return {
    props: {
      widgetHTML: updatedWidgetHTML,
    },
  };
};

export default TicketPage;
