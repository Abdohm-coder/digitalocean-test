// import { BID, SITE_NUMBER } from "@/settings/site.settings";
import { GetServerSideProps } from "next";
import Head from "next/head";

const TermsPage = ({ html }: { html: string }) => {
  return (
    <>
      <Head>
        <title>Terms & Policies</title>
      </Head>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}></div>
    </>
  );
};

export default TermsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      html: `<script type='text/javascript' src='https://tickettransaction.com/?bid=3212&sitenumber=23&tid=600'></script>`,
    },
  };
};
