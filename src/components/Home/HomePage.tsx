import Hero from "./Hero";
import TopEvents from "./TopEvents";
import Events from "../Events";
import NewsLetterForm from "../NewsLetterForm";
import Footer from "../Footer";
import { siteSettings } from "../../settings/site.settings";

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <div className="container">
          <TopEvents count={3} title="Top Event In USA" />
          {siteSettings.main_categories.map((category) => (
            <Events
              key={`category: ${category.title}`}
              count={5}
              {...category}
            />
          ))}
          <NewsLetterForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
