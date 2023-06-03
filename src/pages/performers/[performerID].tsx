import { useEffect, useState } from "react";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { fetchGetEvents, siteSettings } from "@/settings/site.settings";

import Hero from "@/components/Categories/Hero";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const performerID = query.performerID as string;
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);

  useEffect(() => {
    if (performerID) {
      const fetchData = async () => {
        try {
          const response = await fetchGetEvents({
            performerID: +performerID,
            // numberOfEvents: eventNumber,
            // orderByClause: "Date%20DESC",
          });
          setEvents(response || []);
          console.log(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    } else {
      console.log("error event id");
    }
  }, [performerID]);

  return (
    <>
      <Head>
        <title>
          {performerID} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative my-5">
          <Hero title={"Performer ID Test"} />
        </div>
        <EventList
          eventNumber={eventNumber}
          setEventNumber={setEventNumber}
          events={events}
        />
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        {/* <Details performerTitle={capitalizeString(performerTitle)} /> */}
        <NewsLetterForm />
      </main>
    </>
  );
};

export default PerformerPage;
