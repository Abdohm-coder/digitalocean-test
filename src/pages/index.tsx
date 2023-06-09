import Events from "@/components/TopPerformersCategory";
import Hero from "@/components/Home/Hero";
// import TopEvents from "@/components/Home/TopEvents";
import NewsLetterForm from "@/components/NewsLetterForm";
import { siteSettings } from "@/settings/site.settings";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>{siteSettings.site_name} | Concerts, Sports, and Theatre</title>
        <meta name="description" content="Rent Web Application" />
      </Head>
      <main>
        <Hero />
        <div className="container">
          {/* <TopEvents title="Top Event In USA" /> */}
          {siteSettings.main_categories.map((category) => (
            <Events key={`category: ${category.title}`} {...category} />
          ))}
          <NewsLetterForm />
        </div>
      </main>
    </>
  );
};

export default HomePage;
