import CategoriesPage from "@/components/Categories/CategoriesPage";
import { siteSettings } from "@/settings/site.settings";
import Head from "next/head";

const ConcertTickets = () => {
  return (
    <>
    <Head>
      <title>Concerts Tickets | {siteSettings.site_name}</title>
    </Head>
      <CategoriesPage />
    </>
  );
};

export default ConcertTickets;
