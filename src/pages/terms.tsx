import { BID, SITE_NUMBER } from "@/settings/site.settings";
import { GetServerSideProps } from "next";
import Head from "next/head";

const TermsPage = ({ html }: { html: string }) => {
  return (
    <>
      <Head>
        <title>Terms & Policies</title>
      </Head>
      <main>
        <div style={{ marginTop: "2rem" }} className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}></div>
        </div>
      </main>
    </>
  );
};

export default TermsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      html: `<script type='text/javascript' src='https://tickettransaction.com/?bid=${BID}&sitenumber=${SITE_NUMBER}&tid=600'></script>`,
    },
  };
};
