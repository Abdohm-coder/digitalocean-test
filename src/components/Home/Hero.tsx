import { useState, useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import {
  SearchEventsProps,
  SearchPerformersProps,
} from "../../types/data-types";
import { useDebounce } from "use-debounce";
import {
  fetchSearchEvents,
  fetchSearchPerformers,
  siteSettings,
} from "../../settings/site.settings";
import Link from "next/link";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [events, setEvents] = useState<SearchEventsProps[]>([]);
  const [performers, setPerformers] = useState<SearchPerformersProps[]>([]);

  const { venues } = useDataContext();

  const searchVenues = useMemo(
    () =>
      search.trim().length > 0
        ? venues.filter(({ Name }) =>
            Name.toLowerCase().includes(search.toLowerCase())
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedFilter, venues]
  );

  useEffect(() => {
    if (search.trim().length > 0) {
      const fetchData = async () => {
        try {
          const response = await fetchSearchEvents({
            searchTerms: search,
            // orderByClause: "Date%20DESC",
          });
          setEvents(response || []);
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const fetchPerformers = async () => {
        try {
          const response = await fetchSearchPerformers({
            searchTerms: search,
            // orderByClause: "Date%20DESC",
          });
          setPerformers(response || []);
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
      fetchPerformers();
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
          className="form-control form-control-lg rounded-pill bg-transparent border border-2 border-primary text-white py-3 placeholder-gray"
          placeholder="Event, artist or team"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div
          style={{ zIndex: 9999 }}
          className="position-absolute bg-white text-dark mt-3 rounded-2 d-flex flex-column justify-content-center container-fluid">
          {performers.length > 0 && (
            <>
              <div className="search-result-title">Performers</div>
              {removeDuplicatedElements(performers, "Description").map(
                ({ ID, Description }) => (
                  <div key={ID}>
                    <Link
                      href={`/performers/${ID}`}
                      className="search-result-item">
                      {Description}
                    </Link>
                  </div>
                )
              )}
            </>
          )}
          {events.length > 0 && (
            <>
              <div className="search-result-title">Events</div>
              {removeDuplicatedElements(events, "Name").map(({ ID, Name }) => (
                <div key={ID}>
                  <Link
                    href={`/performers/${convertTitleToPath(Name)}`}
                    className="search-result-item">
                    {Name}
                  </Link>
                </div>
              ))}
            </>
          )}
          {searchVenues.length > 0 && (
            <>
              <div className="search-result-title">Venues</div>
              {searchVenues.map(({ ID, Name }) => (
                <div key={ID}>
                  <Link
                    href={`/performers/${convertTitleToPath(Name)}`}
                    className="search-result-item">
                    {Name}
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
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
