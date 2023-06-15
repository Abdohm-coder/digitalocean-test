import { WBCID } from "@/settings/site.settings";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

const TicketPage = ({ widgetHTML }: { widgetHTML: string }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no, width=device-width"
        />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventID = context.params?.eventID;
  // @ts-ignore
  const userAgent = context.headers?.["user-agent"] || "something";

  const response = await axios.get(
    `https://mapwidget3.seatics.com/html?eventId=${eventID}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  );

  const widgetHTML = response.data;
  const additionalScript = `
  <script>
			Seatics = Seatics || {};
			Seatics.config = Seatics.config || {};

			Seatics.config.enableLegalDisclosureMobile = false;
			Seatics.config.enableHeaderLowerLegalDisclosureMobile = false;
			Seatics.config.enableQuantityModal = true;
	    Seatics.config.c3CheckoutDomain = "checkout.ticketfront.com";
      Seatics.config.c3CurrencyCode = "USD";
      Seatics.config.useC3 = true;
			Seatics.config.showBranding = false;
			Seatics.config.useSuperLevels = true;
			Seatics.config.selectionScheme = 1;
      Seatics.config.buyButtonContentHtml = '<button class="btn-buy venue-ticket-list-checkout-trigger-js">Continue</button>';
			Seatics.config.preCheckoutButtonHtml = 'Checkout';
			Seatics.config.legendExpanded = false;
			Seatics.config.tgMarkTooltipText = 'This seller is so confident in the quality of their tickets, they will guarantee your order at 125%!';
			Seatics.config.enableMapMarketing = false;
			Seatics.config.skipPrecheckoutDesktop = true;
			Seatics.config.ticketListOnRight = true;
			Seatics.config.mapContained = true;
			Seatics.config.enableListMarketingDesktop = false;
			Seatics.config.enableMyList = false;
			Seatics.config.showTLCompare = false;
			Seatics.config.showTLCompareBtn = false;
			Seatics.config.skipPrecheckoutMobile = true;
			Seatics.config.enableListMarketingMobile = false;
			Seatics.config.smallScreenMapLayout = Seatics.SmallScreenMapOptions.FullyHidden;
			Seatics.config.tgGuaranteeNoteHtml = '';
			Seatics.config.eventInfoRightCol = '<a id="headerPhoneNum" class="btn btn-default btn-sm" href="tel:8888913794"><i class="fa fa-phone"></i></a>';
			Seatics.config.showZoomControls = true;
			Seatics.config.enableFeedBack = false;
			Seatics.config.enableHeaderMarketing = false;
      Seatics.config.noTicketsHandler = function () {
      $('.pdp-blurbtext, .desktop-back-btn').hide();
      
      document.title = 'No Tickets Available';

      $('#tn-maps-inner').hide();
         var divToAdd = \`<div id="no-tickets-msg-ctn" class="no-tickets-msg-ctn">
          <p class="no-tickets-msg-hdr">
              Sorry, There is not tickets for this event.
          </p>
          <div class="no-tickets-msg-text-ctn">
              Please try:
              <div>
                  <ul class="no-tickets-msg-list">
                      <li>Searching for a different event date</li>
                  </ul>
              </div>
          </div>
      </div> \`;
    $("#tn-maps").append(divToAdd);
};

Seatics.config.mapFinishedRenderingHandler = function(){
        document.title = document.querySelector("#sea-event-info-name").textContent + " at " + document.querySelector(".event-info-place").children[1].textContent;
        document.querySelector('#tn-maps').classList.add('completed');                
        Seatics.config.ticketSeparationOptions = {
          packages: Seatics.TicketGroupSeparationOptions.Separate,
          parking: Seatics.TicketGroupSeparationOptions.Separate,
          passes: Seatics.TicketGroupSeparationOptions.Separate,
          hotels: Seatics.TicketGroupSeparationOptions.Separate,
          unmappedFlex: Seatics.TicketGroupSeparationOptions.Separate,
          unmappedStandard: Seatics.TicketGroupSeparationOptions.Separate
        };    
        // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //   setTimeout(function(){ document.querySelector("#list-ctn").style.top = '96px'; }, 900);
                      
        // }
      };

  document.addEventListener("DOMContentLoaded", function () {
    Seatics.config.ticketRowRenderedHandler = function () {
        var year = parseInt($('.event-info-date-date.event-info-date-loc').text().split(' ')[2]);
        var container = $("#event-info-area .event-info-content");

        if (year > 2030 && !container.hasClass('postponed')) {
          container.addClass('postponed');
            $('.event-info-date-date').html("Currently");
            $('.event-info-date-time').html('Postponed');
            $('.event-info-date-time-span').html("<span class='cm-time'></span>Currently Postponed");
          }
      $("#map-shower").on("click", () => {
        if($("#map-resize-txt").html() === "Show Map"){ $("#venue-map").css("top", "0"); $("#list-ctn").css("top", "330px                                                                                                                                                                                                                                   ")}
      });
 
    };
  });
    </script>
  `;

  const updatedWidgetHTML = widgetHTML + additionalScript;

  return {
    props: {
      widgetHTML: updatedWidgetHTML,
      eventID,
    },
  };
};

export default TicketPage;
