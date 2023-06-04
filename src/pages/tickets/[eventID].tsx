// import { useState } from "react";
import axios from "axios";
// import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { siteSettings } from "@/settings/site.settings";
import Script from "next/script";

const TicketPage = ({ widgetHTML }: { widgetHTML: string }) => {
  // const [show, setShow] = useState(false);
  return (
    <div>
      <Head>
        <title>Map Widget | {siteSettings.site_name}</title>
      </Head>
      <Script
        src="https://maps.seatics.com/jquery_beta_tn.js"
        type="text/javascript"></Script>
      <Script
        src="https://code.jquery.com/jquery-3.7.0.min.js"
        integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="
        crossOrigin="anonymous"></Script>
      {/* <div> */}
      <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
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
  const userAgent = "something";
  const WBCID = 4626;

  const response = await axios.get(
    `https://mapwidget3.seatics.com/html?eventId=${eventID}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  );

  const widgetHTML = response.data;
  const additionalScript = `
    <script>
      Seatics.config.c3CheckoutDomain = "checkout.ticketjewel.com";
      Seatics.config.c3CurrencyCode = "USD";
      Seatics.config.useC3 = true;
      Seatics.config.currencyIntl = {};
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
