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
    function sanitizeString(str) {
      str = str.toLowerCase().replace(/[^a-z0-9-\s]/gi, '').replace(/\s/g, '-').replace(/-+/g, '-');
      return str;
  }
			var seaticsBackUrl = "/performers/" + sanitizeString(page.performerName) + "-tickets",
			Seatics = Seatics || {};
			Seatics.config = Seatics.config || {};
			Seatics.eventInfo.eventName = page.eventName;

			Seatics.config.enableLegalDisclosureMobile = true;
			Seatics.config.listLegalDisclosure = '<div class="sea-list-marketing-inner">\ <span class="sea-list-marketing-label" id="sea-listdisclosurelabel" style="font-size:1.0em; font-family: Arial; font-weight:900; text-align:justify; width:100%;">As a resale marketplace, prices may be above face value.</span>\ </div><div id="sea-list-legal-close" class="sea-listmarketing-close cm-close"></div>';
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
      Seatics.config.eventInfoLeftCol = "<a href='" + seaticsBackUrl + "' class='back-category-js mobile-back-btn'><span class='icon arrow-right-small'></span> Back</a>";
			Seatics.config.eventInfoRightCol = '<a id="headerPhoneNum" class="btn btn-default btn-sm" href="tel:8888913794"><i class="fa fa-phone"></i></a>';
			Seatics.config.showZoomControls = true;
			Seatics.config.enableFeedBack = false;
			Seatics.config.enableHeaderMarketing = true;
			Seatics.config.headerMarketingHtmlFilter = '<span class="sea-marketing-header-gift icon-gift"></span><div id="sea-marketing-header-close" class="sea-marketing-header-close icon-cancel"></div><span class="sea-marketing-header-label"><strong><em>Attend in Style</em></strong></span><span class="sea-marketing-header-label">Explore ticket packages for extra access, amenities & more.</span><span class="sea-marketing-header-label-show">Show Packages</span>';
			Seatics.config.headerMarketingHtmlAll = '<span class="sea-marketing-header-gift icon-gift"></span><div id="sea-marketing-header-close" class="sea-marketing-header-close icon-cancel"></div><span class="sea-marketing-header-label"><strong><em>Attend in Style</em></strong></span><span class="sea-marketing-header-label">Explore ticket packages for extra access, amenities & more.</span><span class="sea-marketing-header-label-show">Hide Packages</span>';
      Seatics.config.noTicketsHandler = function () {
        $('.pdp-blurbtext, .desktop-back-btn').hide();
        document.title = 'No Tickets Available';
      };



  document.addEventListener("DOMContentLoaded", function () {
    Seatics.config.ticketRowRenderedHandler = function () {
        var year = parseInt($('.event-info-date-date.event-info-date-loc').text().split(' ')[2]);
        var container = $("#event-info-area .event-info-content");
        var seaticsBackLinkHTML = "<a href='/performers/" + sanitizeString($('#var_performer_name').text()) + "-tickets' class='btn btn-blue desktop-back-btn'>Show All Events</a>"

        if (year > 2030 && !container.hasClass('postponed')) {
          container.addClass('postponed');
            $('.event-info-date-date').html("Currently");
            $('.event-info-date-time').html('Postponed');
            $('.event-info-date-time-span').html("<span class='cm-time'></span>Currently Postponed");
          }
        if (container.length > 0 && !$('.desktop-back-btn').length) {
            container.append(seaticsBackLinkHTML);
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
