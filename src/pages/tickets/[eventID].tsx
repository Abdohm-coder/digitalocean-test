// import { useState } from "react";
import axios from "axios";
// import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchGetEvents, siteSettings } from "@/settings/site.settings";
import { useEffect, useState } from "react";
import { GetEventsProps } from "@/types/data-types";

const TicketPage = ({
  widgetHTML,
  eventID,
}: {
  widgetHTML: string;
  eventID: string;
}) => {
  useEffect(() => {
    const addTableCell = () => {
      const tableRow = document.querySelector(
        "table.venue-ticket-list-tbl tbody tr"
      );
      if (tableRow) {
        const tableData = document.createElement("td");
        tableData.className =
          "venue-ticket-list-cta-js venue-ticket-list-cta-col";

        const button = document.createElement("button");
        button.className = "btn-buy venue-ticket-list-checkout-trigger-js";
        button.innerText = "Continue";

        tableData.appendChild(button);
        tableRow.appendChild(tableData);
      }
    };

    addTableCell();
  }, []);
  const [events, setEvents] = useState<GetEventsProps[]>([]);

  useEffect(() => {
    if (+eventID) {
      const fetchEvents = async () => {
        try {
          const response = await fetchGetEvents({
            eventID: +eventID,
          });
          setEvents(response || []);
          console.log(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    }
  }, [eventID]);

  return (
    <div>
      <Head>
        <title>
          {events[0]?.Name || "Map Widget"} {events[0]?.DisplayDate} |{" "}
          {siteSettings.site_name}
        </title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventID = context.params?.eventID;
  const WBCID = 4626;
  const userAgent = context.headers?.["user-agent"] || "something";

  const response = await axios.get(
    `https://mapwidget3.seatics.com/html?eventId=${eventID}&websiteConfigId=${WBCID}&userAgent=${userAgent}`
  );

  const widgetHTML = response.data;
  const additionalScript = `
  <script>
			Seatics = Seatics || {};
			Seatics.config = Seatics.config || {};

			Seatics.config.enableLegalDisclosureMobile = true;
			Seatics.config.useC3 = true;
      Seatics.config.c3CheckoutDomain = "checkout.ticketfront.com";
			Seatics.config.c3CurrencyCode = 'USD';
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
      };

Seatics.config.mapFinishedRenderingHandler = function(){
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
        //   console.log("dsd");
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
      })

    };
  });
    </script>
  `;

  const updatedWidgetHTML = widgetHTML + additionalScript;

  console.log(updatedWidgetHTML);

  return {
    props: {
      widgetHTML: updatedWidgetHTML,
      eventID,
    },
  };
};

export default TicketPage;
