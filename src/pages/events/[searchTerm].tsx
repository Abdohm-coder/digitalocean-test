import { useEffect, useState } from "react";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { fetchSearchEvents, siteSettings } from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";
import { convertQueryToTitle } from "@/utils/query-to-title";
import Loading from "@/components/Loading";

const SearchEventsPage: React.FC = () => {
  const { query } = useRouter();
  const searchEventTerm = query.searchTerm as string;
  const [searchTitle, setSearchTitle] = useState("");
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = convertQueryToTitle(searchEventTerm);
    setSearchTitle(name);
  }, [searchEventTerm]);

  useEffect(() => {
    if (searchTitle) {
      const fetchEvents = async () => {
        try {
          const response = await fetchSearchEvents({
            searchTerms: searchTitle,
          });
          setLoading(false);
          setEvents(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    }
  }, [searchTitle]);
  return (
    <>
      <Head>
        <title>
          {capitalizeString(searchTitle)} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative card-img">
          <h1 className="m-0 fw-bold text-capitalize">
            Search result for {capitalizeString(searchTitle)} Tickets
          </h1>
        </div>

        {loading ? <Loading /> : <EventList events={events} />}
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <NewsLetterForm />
      </main>
    </>
  );
};

export default SearchEventsPage;
