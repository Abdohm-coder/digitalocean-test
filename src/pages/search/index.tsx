import { useState, useEffect } from "react";
import EventList from "@/components/Event/EventList";
import Loading from "@/components/Loading";
import { GetEventsProps } from "@/types/data-types";
import { capitalizeString } from "@/utils/capitalize-string";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import {
  fetchGetEvents,
  fetchSearchEvents,
  siteSettings,
} from "@/settings/site.settings";
import NewsLetterForm from "@/components/NewsLetterForm";
import { convertQueryToTitle } from "@/utils/query-to-title";
import { useDataContext } from "@/context/data.context";

const SearchPage = () => {
  const { venues } = useDataContext();
  const searchParams = useSearchParams();
  const venue = searchParams.get("venue");
  const performer = searchParams.get("performer");
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (performer) {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const response = await fetchSearchEvents({
            searchTerms: convertQueryToTitle(performer),
          });
          setEvents(response || []);
        } catch (error) {
          setEvents([]);
          console.error("Error:", error);
        }
        setLoading(false);
      };
      fetchEvents();
    }
    if (venue) {
      setLoading(true);
      const venueData = venues.find(({ Name }) =>
        Name.toLowerCase().includes(convertQueryToTitle(venue))
      );
      if (venueData) {
        const fetchEvents = async () => {
          try {
            const response = await fetchGetEvents({
              venueID: venueData.ID,
              orderByClause: "Date ASC",
              whereClause: "",
            });
            setLoading(false);
            setEvents(response || []);
          } catch (error) {
            console.error("Error:", error);
          }
        };
        setLoading(false);
        fetchEvents();
      }
    }
  }, [venue, venues, performer]);

  return (
    <>
      <Head>
        <title>
          {capitalizeString(convertQueryToTitle(venue || performer))} Tickets |{" "}
          {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative card-img">
          <h1 className="m-0 fw-bold text-capitalize">
            Search result for{" "}
            {capitalizeString(convertQueryToTitle(venue || performer))} Tickets
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

export default SearchPage;
