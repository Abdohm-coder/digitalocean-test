import CategoriesPage from "@/components/Categories/CategoriesPage";
import { siteSettings } from "@/settings/site.settings";
import Head from "next/head";

const SportsTickets = () => {
  return (
    <>
      <Head>
        <title>Sports Tickets | {siteSettings.site_name}</title>
      </Head>
      <CategoriesPage />
    </>
  );
};

export default SportsTickets;
