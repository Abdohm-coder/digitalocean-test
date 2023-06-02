import { useEffect, useState, useMemo } from "react";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { fetchGetEvents, siteSettings } from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";
import { convertQueryToTitle } from "@/utils/query-to-title";
import { useDataContext } from "@/context/data.context";
import Hero from "@/components/Categories/Hero";

const VenuePage: React.FC = () => {
  const { query } = useRouter();
  const { venues } = useDataContext();
  const venueName = query.venueName as string;
  const [venueTitle, setVenueTitle] = useState("");
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);

  useEffect(() => {
    if (venueName) {
      const name = convertQueryToTitle(venueName);
      setVenueTitle(name);
    }
  }, [venueName]);

  const venueData = useMemo(() => {
    return venues.find(({ Name }) => Name.toLowerCase().includes(venueTitle));
  }, [venues, venueTitle]);

  useEffect(() => {
    if (venueData) {
      const fetchEvents = async () => {
        try {
          const response = await fetchGetEvents({
            venueID: venueData.ID,
            // numberOfEvents: eventNumber,
            // orderByClause: "Date%20DESC",
          });
          setEvents(response || []);
          console.log(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    } else {
      console.log("error event id");
    }
  }, [venueData]);
  return (
    <>
      <Head>
        <title>
          {capitalizeString(venueTitle)} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative my-5">
          <Hero title={venueTitle} />
        </div>
        <EventList
          eventNumber={eventNumber}
          setEventNumber={setEventNumber}
          events={events}
        />
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <NewsLetterForm />
      </main>
    </>
  );
};

export default VenuePage;
