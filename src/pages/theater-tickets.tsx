import CategoriesPage from "@/components/Categories/CategoriesPage";
import { siteSettings } from "@/settings/site.settings";
import Head from "next/head";

const TheatreTickets = () => {
  return (
    <>
      <Head>
        <title>Theatre Tickets | {siteSettings.site_name}</title>
      </Head>
      <CategoriesPage />
    </>
  );
};

export default TheatreTickets;
