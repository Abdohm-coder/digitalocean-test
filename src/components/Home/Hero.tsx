import { useState, useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchPerformersProps } from "../../types/data-types";
import { useDebounce } from "use-debounce";
import {
  fetchSearchPerformers,
  siteSettings,
} from "../../settings/site.settings";
import Link from "next/link";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [performers, setPerformers] = useState<SearchPerformersProps[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { venues, searchHeroRef } = useDataContext();

  const searchVenues = useMemo(
    () =>
      search.trim().length > 0 && Array.isArray(venues)
        ? venues.filter(({ Name }) =>
            Name.toLowerCase().includes(search.toLowerCase())
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedFilter, venues]
  );

  useEffect(() => {
    if (search.trim().length > 0) {
      setLoading(true);
      const fetchPerformers = async () => {
        try {
          const response = await fetchSearchPerformers({
            searchTerms: search,
          });
          setPerformers(response || []);
        } catch (error) {
          setPerformers([]);
          console.error("Error:", error);
        }
        setLoading(false);
      };
      fetchPerformers();
    } else {
      setPerformers([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    router.push(`/search?performer=${convertTitleToPath(search)}`);
  };

  return (
    <section
      className="bg-info d-flex flex-column align-items-center text-white pb-5"
      style={{ minHeight: "50vh" }}>
      <div className="container-lg border-light border-top"></div>
      <h1 className="mt-auto">{siteSettings.hero_text.title}</h1>
      <h3>{siteSettings.hero_text.p}</h3>
      <form
        onSubmit={handleSubmit}
        className="position-relative mt-3 col-11 col-md-8 col-lg-6 col-xl-4 mb-auto">
        <div ref={searchHeroRef}>
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
            {loading && (
              <div
                style={{ textAlign: "center", paddingBottom: "30px" }}
                className="search-result-title">
                Loading...
              </div>
            )}
            {performers.length > 0 && (
              <>
                <div className="search-result-title">Performers</div>
                {removeDuplicatedElements(performers, "Description")
                  .slice(0, 6)
                  .map(({ ID, Description }) => (
                    <div onClick={() => setSearch("")} key={ID}>
                      <Link
                        href={`/performers/${convertTitleToPath(Description)}`}
                        className="search-result-item">
                        {Description}
                      </Link>
                    </div>
                  ))}
                {removeDuplicatedElements(performers, "Description").length >
                  6 && (
                  <div onClick={() => setSearch("")}>
                    <Link
                      style={{ color: "#3683fc" }}
                      href={`/search?performer=${convertTitleToPath(search)}`}
                      className="search-result-item pe-2">
                      View All
                    </Link>
                  </div>
                )}
              </>
            )}

            {searchVenues.length > 0 && (
              <>
                <div className="search-result-title">Venues</div>
                {removeDuplicatedElements(searchVenues, "Name")
                  .slice(0, 6)
                  .map(({ ID, Name }) => (
                    <div onClick={() => setSearch("")} key={ID}>
                      <Link
                        href={`/venues/${convertTitleToPath(Name)}`}
                        className="search-result-item">
                        {Name}
                      </Link>
                    </div>
                  ))}
              </>
            )}
            {removeDuplicatedElements(searchVenues, "Name").length > 6 && (
              <div onClick={() => setSearch("")}>
                <Link
                  style={{ color: "#3683fc" }}
                  href={`/search?venue=${convertTitleToPath(search)}`}
                  className="search-result-item pe-2">
                  View All
                </Link>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary rounded-circle text-white position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
            style={{ height: "80%", right: "1%" }}>
            <BsSearch />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Hero;
