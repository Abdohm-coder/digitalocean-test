import { useState, useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchEventsProps } from "../../types/data-types";
import { useDebounce } from "use-debounce";
import { fetcSearchEvents, siteSettings } from "../../settings/site.settings";
import Link from "next/link";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [data, setData] = useState<SearchEventsProps[]>([]);

  const { venues, performers } = useDataContext();

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
  const searchPerformers = useMemo(
    () =>
      search.trim().length > 0
        ? performers.filter(({ PerformerName }) =>
            PerformerName.toLowerCase().includes(search.toLowerCase())
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedFilter, performers]
  );

  useEffect(() => {
    if (search.trim().length > 0) {
      const fetchSearchEvents = async () => {
        try {
          const response = await fetcSearchEvents({
            searchTerms: search,
            // orderByClause: "Date%20DESC",
          });
          setData(response || []);
          console.log(data);
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
          className="form-control form-control-lg rounded-pill bg-transparent border border-2 border-primary text-white py-3 placeholder-gray"
          placeholder="Event, artist or team"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div
          style={{ zIndex: 9999 }}
          className="position-absolute bg-white text-dark mt-3 rounded-2 d-flex flex-column justify-content-center container-fluid">
          {data.length > 0 && (
            <>
              <div className="search-result-title">Performers</div>
              {removeDuplicatedElements(searchPerformers, "PerformerName").map(
                ({ PerformerName, PerformerID }) => (
                  <div key={PerformerID}>
                    <Link
                      href={`/performers/${convertTitleToPath(PerformerName)}`}
                      className="search-result-item">
                      {PerformerName}
                    </Link>
                  </div>
                )
              )}
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
