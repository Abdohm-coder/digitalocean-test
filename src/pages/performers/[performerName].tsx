import PerformerPage from "@/components/Performer/PerformerPage";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const PerformersPage = () => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>{query.performerName} Tickets | Ticketjewel</title>
      </Head>
      <PerformerPage />
    </>
  );
};

export default PerformersPage;
