import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchEventsProps } from "../../types/data-types";
import { useDebounce } from "use-debounce";
import { siteSettings } from "../../settings/site.settings";
import Link from "next/link";
import axios from "axios";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [data, setData] = useState<SearchEventsProps[]>([]);

  useEffect(() => {
    if (search.trim().length > 0) {
      const fetchSearchEvents = async () => {
        try {
          const response = await axios.post("/api/SearchEvents", {
            searchTerms: search,
          });
          const data = response.data.SearchEventsResult.Event;
          setData(data);
          console.log(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchSearchEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  return (
    <section
      className="bg-info d-flex flex-column align-items-center text-white pb-5"
      style={{ minHeight: "50vh" }}>
      <div className="container-lg border-light border-top"></div>
      <h1 className="mt-auto">{siteSettings.hero_text.title}</h1>
      <h3>{siteSettings.hero_text.p}</h3>
      <div className="position-relative mt-3 col-11 col-md-8 col-lg-6 col-xl-4 mb-auto">
        <input
          type="text"
          className="form-control form-control-lg rounded-pill bg-transparent border border-2 border-primary text-white py-3"
          placeholder="Event, artist or team"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {
          <div
            style={{ zIndex: 9999 }}
            className="position-absolute bg-white text-dark mt-3 rounded-2 d-flex flex-column justify-content-center container-fluid">
            <div className="search-result-title">Performers</div>
            <Link href={"#"} className="search-result-item">
              Grace Potter
            </Link>
            <Link href={"#"} className="search-result-item">
              Grand Ole Opry
            </Link>
            <div className="search-result-title">Cities</div>
            <Link href={"#"} className="search-result-item">
              Grand Rapids, MI
            </Link>
            <Link href={"#"} className="search-result-item">
              Grand Junction, CO
            </Link>
          </div>
        }
        <button
          className="btn btn-lg btn-primary rounded-circle text-white position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
          style={{ height: "80%", right: "1%" }}>
          <BsSearch />
        </button>
      </div>
    </section>
  );
};

export default Hero;
