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
			Seatics.config.buyButtonContentHtml = '<span class="btn btn-blue">Buy</span>';
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

var promo_dict = {
       'save10': 0.9
    }
    var getPromoFactor = function(promo) {
        if (!promo) {
            return 1.0;
        }
        if (!(promo in promo_dict)) {
            // Not included but is a share promo
            return 1.0;
        }
        return promo_dict[promo];
    }
    var checkIsValidPromo = function(promo)  {
        if (!promo) {
            return false;
        }
        if (promo in promo_dict) {
            return true;
        }
        return false;
    }

    function GetCookieValue(a) {
        var b = RegExp("" + a + "[^;]+").exec(document.cookie);
        return unescape(b ? b.toString().replace(/^[^=]+./, "") : "");
    }

    var click_through_promo = GetCookieValue("tn_Promo");
    click_through_promo = (!click_through_promo) ? '' : click_through_promo.toLowerCase();
    var promo_factor = getPromoFactor(click_through_promo);
    var promo_name = (!click_through_promo) ? '' : click_through_promo.toUpperCase();

document.addEventListener("DOMContentLoaded", function () {
    Seatics.config.ticketRowRenderedHandler = function () {
        var year = parseInt($('.event-info-date-date.event-info-date-loc').text().split(' ')[2]);
        var container = $("#event-info-area .event-info-content");
        var seaticsBackLinkHTML = "<a href='/performers/" + sanitizeString($('#var_performer_name').text()) + "-tickets' class='btn btn-blue desktop-back-btn'>Show All Events</a>"

            if (year > 2030 && !container.hasClass('postponed')) {
container.addClass('postponed')
                $('.event-info-date-date').html("Currently");
                $('.event-info-date-time').html('Postponed');
                $('.event-info-date-time-span').html("<span class='cm-time'></span>Currently Postponed");
            }
        if (container.length > 0 && !$('.desktop-back-btn').length) {
            container.append(seaticsBackLinkHTML);
        }

        try {
            if (checkIsValidPromo(click_through_promo)) {
                var tickets = Seatics.Presentation.TicketsList.currentSegments[0].tickets;
                var ticket_dict = {};
                for (const ticket of tickets) {
                    if (!(ticket.tgID in ticket_dict)) {
                        ticket_dict[ticket.tgID] = ticket;
                        try {
                            var promo_factor = getPromoFactor(click_through_promo);
                            $('tr[data-id="' + ticket.tgID + '"] .venue-ticket-list-cta-amt').addClass('price-discounted-strike');
                            $('tr[data-id="' + ticket.tgID + '"] .venue-ticket-list-cta-amt-suffix').text('    $' + Math.round(ticket.tgPrice * promo_factor) + '/ea');
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    var _mapFinishedRenderingHandler = Seatics.config.mapFinishedRenderingHandler;
    Seatics.config.mapFinishedRenderingHandler = function () {
        try {
            _mapFinishedRenderingHandler();
        } catch (e) {}
        try {
            var create_pre_checkout_discount_html = function (price) {
                var promoDiv = '' +
                    '<div id="pre-checkout-discount-price-text-ctn" class="pre-checkout-price-text-ctn custom-promocode-pre-checkout" style="margin-top: 0px;">' +
                    '<div class="vertical-align-middle pre-checkout-est-section-50 sea-pre-checkout-sub-label">' +
                    '<span><strong>' + promo_name + ' Subtotal</strong></span><br>' +
                    '</div>' +
                    '<div class="vertical-align-middle pre-checkout-est-section-25 pre-checkout-est-section-30">' +
                    '<div id="pre-checkout-est-section-calc" style="display: block;">' +
                    '<span id="pre-checkout-selected-qty-label">You Save </span><span id="pre-checkout-each-price-label">$' + Math.round(price * (1 - promo_factor)) + '</span><span class="venue-ticket-list-cta-amt-suffix"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="vertical-align-middle pre-checkout-est-section-25 pre-checkout-est-section-20 sea-pre-checkout-sub-amt">' +
                    '<div class="">' +
                    '<span id="pre-checkout-price-amt" class="pre-checkout-price-amt" style="color: #28c142">$' + Math.round(price * promo_factor) + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                return promoDiv;
            };
            if (checkIsValidPromo(click_through_promo)) {
                $("#precheckout-parent").focusin(function () {
                    // Reset
                    if ($("#pre-checkout-discount-price-text-ctn")) {
                        $("#pre-checkout-discount-price-text-ctn").remove();
                    }
                    $("#pre-checkout-price-amt").removeClass('price-discounted-strike');

                    if ($("#precheckout-parent .slick-track li.sea-selected").length > 0) {
                        if (checkIsValidPromo(click_through_promo)) {
           …
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
