import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { query, pathname } = ctx; // Assuming the page ID is passed as a query parameter

    return { ...initialProps, pathname, eventID: query?.eventID };
  }

  render() {
    const { eventID, pathname } = this.props;
    console.log(eventID, pathname);

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, user-scalable=no, width=device-width"
          />
          {pathname?.includes("/tickets/") && (
            <>
              <Script
                strategy="beforeInteractive"
                src={`https://mapwidget3.seatics.com/js?eventId=${eventID}&websiteConfigId=4626`}
                type="text/javascript"></Script>
              <Script id="edit-map">
                {`Seatics.config.c3CheckoutDomain = "checkout.ticketjewel.com";
      Seatics.config.c3CurrencyCode = "USD";
      Seatics.config.useC3 = true;
      Seatics.config.currencyIntl = {};
      
               Seatics.config.skipPrecheckoutDesktop = true; /*default = false*/
               Seatics.config.skipPrecheckoutMobile = true; /*default = false*/
			   Seatics.config.c3CheckoutDomain = "checkout.ticketfront.com";
                Seatics.config.c3CurrencyCode = "USD";
                Seatics.config.useC3 = true;
                Seatics.config.buyButtonContentHtml = '<button class="btn-buy venue-ticket-list-checkout-trigger-js">Continue</button>';
                Seatics.config.tgGuaranteeNoteHtml = '';
                Seatics.config.tgMarkTooltipText = 'These tickets are featured as a great value.';
                Seatics.config.enableLegalDisclosureMobile = false;
Seatics.config.enableHeaderLegalDisclosureMobile = false;
Seatics.config.enableHeaderLowerLegalDisclosureMobile = false; 
Seatics.config.smallScreenMapLayout =
Seatics.SmallScreenMapOptions.FullyHidden;

                Seatics.config.onBuyButtonClicked = function(){
                //location.href = 'checkout.ticketgrow.com/Checkout/Order';
                //_bShowCoupon = false;
                
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
                
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    console.log("dsd");
                    setTimeout(function(){ document.querySelector("#list-ctn").style.top = '96px'; }, 900);
                    
}
                  };
		`}
              </Script>
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
