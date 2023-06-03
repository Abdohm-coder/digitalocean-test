import { useState, useEffect } from "react";
import { WBCID, fetchGetEventTickets3 } from "@/settings/site.settings";
import { GetEventTickets3Props } from "@/types/data-types";
import { useRouter } from "next/router";
import axios from "axios";
import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";

const TicketPage = ({ widgetHTML }: { widgetHTML: string }) => {
  const { query } = useRouter();
  const eventID = query.eventID as string;
  const [tickets, setTickets] = useState<GetEventTickets3Props[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (+eventID) {
      const fetchData = async () => {
        try {
          const response = await fetchGetEventTickets3({
            eventID: +eventID,
          });
          setTickets(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const fetchData2 = async () => {
        try {
          const response = await fetchGetEventTickets3({
            ticketGroupID: +eventID,
          });
          setTickets(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData2();
      fetchData();
    }
  }, [eventID]);
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

export async function getServerSideProps(context) {
  const { eventId } = context.params;
  const userAgent = "something";

  const response = await axios.get(
    `https://mapwidget3.seatics.com/html?eventId=${eventId}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  );

  const widgetHTML = response.data;
  const additionalScript = `
    <script>
    Seatics.config.enableQuantityModal = true;
    Seatics.config.mapContained = true;
      Seatics.config.c3CheckoutDomain = "checkout.tickettransaction.com";
      Seatics.config.c3CurrencyCode = "USD";
      Seatics.config.useC3 = true;
      Seatics.config.currencyIntl = {};
      Seatics.config.enableLegalDisclosureMobile = false;
      Seatics.config.enableHeaderLegalDisclosureMobile = true;

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
}

export default TicketPage;
