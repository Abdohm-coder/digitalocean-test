import { BID, SITE_NUMBER } from "@/settings/site.settings";
import Head from "next/head";

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms & Policies</title>
      </Head>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <script type='text/javascript' src='https://tickettransaction.com/?bid=${BID}&sitenumber=${SITE_NUMBER}&tid=600'></script>
    `,
        }}></div>
    </>
  );
};

export default TermsPage;
