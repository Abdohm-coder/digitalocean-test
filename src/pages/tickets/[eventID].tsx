// import { useState } from "react";
// import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { siteSettings } from "@/settings/site.settings";
import Script from "next/script";

const TicketPage = ({ eventID }: { eventID: string }) => {
  // const [show, setShow] = useState(false);
  return (
    <div>
      <Head>
        <title>Map Widget | {siteSettings.site_name}</title>
      </Head>

      {/* <div> */}
      {/* <div dangerouslySetInnerHTML={{ __html: widgetHTML }} /> */}
      {/* </div> */}
      {/* <div className="d-block d-lg-none text-center">
        {show && <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />}
        <button
          className="btn btn-sm btn-light mt-2"
          onClick={() => setShow((s) => !s)}>
          {show ? "Hide Map " : "Show Map "}
          {show ? <BsArrowsAngleContract /> : <BsArrowsFullscreen />}
        </button>
      </div> */}

      {/* Render the widgetHTML */}

      {/* Rest of your ticket results page content */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventID = context.params?.eventID;
  //   const WBCID = 4626;
  //   const userAgent = context.headers?.["user-agent"] || "something";

  //   const response = await axios.get(
  //     `https://mapwidget3.seatics.com/html?eventId=${eventID}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  //   );

  //   const widgetHTML = response.data;
  //   const additionalScript = `
  //     <script>
  //       Seatics.config.c3CheckoutDomain = "checkout.ticketjewel.com";
  //       Seatics.config.c3CurrencyCode = "USD";
  //       Seatics.config.useC3 = true;
  //       Seatics.config.currencyIntl = {};

  //                Seatics.config.skipPrecheckoutDesktop = true; /*default = false*/
  //                Seatics.config.skipPrecheckoutMobile = true; /*default = false*/
  // 			   Seatics.config.c3CheckoutDomain = "checkout.ticketfront.com";
  //                 Seatics.config.c3CurrencyCode = "USD";
  //                 Seatics.config.useC3 = true;
  //                 Seatics.config.buyButtonContentHtml = '<button class="btn-buy venue-ticket-list-checkout-trigger-js">Continue</button>';
  //                 Seatics.config.tgGuaranteeNoteHtml = '';
  //                 Seatics.config.tgMarkTooltipText = 'These tickets are featured as a great value.';
  //                 Seatics.config.enableLegalDisclosureMobile = false;
  // Seatics.config.enableHeaderLegalDisclosureMobile = false;
  // Seatics.config.enableHeaderLowerLegalDisclosureMobile = false;
  // Seatics.config.smallScreenMapLayout =
  // Seatics.SmallScreenMapOptions.FullyHidden;

  //                 Seatics.config.onBuyButtonClicked = function(){
  //                 //location.href = 'checkout.ticketgrow.com/Checkout/Order';
  //                 //_bShowCoupon = false;

  //               };

  //               Seatics.config.mapFinishedRenderingHandler = function(){
  //                     document.querySelector('#tn-maps').classList.add('completed');
  //                     Seatics.config.ticketSeparationOptions = {
  //                       packages: Seatics.TicketGroupSeparationOptions.Separate,
  //                       parking: Seatics.TicketGroupSeparationOptions.Separate,
  //                       passes: Seatics.TicketGroupSeparationOptions.Separate,
  //                       hotels: Seatics.TicketGroupSeparationOptions.Separate,
  //                       unmappedFlex: Seatics.TicketGroupSeparationOptions.Separate,
  //                       unmappedStandard: Seatics.TicketGroupSeparationOptions.Separate
  //                     };

  //                 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //                     console.log("dsd");
  //                     setTimeout(function(){ document.querySelector("#list-ctn").style.top = '96px'; }, 900);

  // }
  //                   };

  //     </script>
  //   `;

  //   const updatedWidgetHTML = widgetHTML.replace(
  //     "</head>",
  //     `${additionalScript}</head>`
  //   );

  return {
    props: {
      // widgetHTML: updatedWidgetHTML,
      eventID,
    },
  };
};

export default TicketPage;
