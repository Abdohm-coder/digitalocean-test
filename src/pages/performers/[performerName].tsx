import { useEffect, useState } from "react";
import EventBg from "@/assets/images/EventBg.webp";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import Details from "@/components/Event/Details";
import Footer from "@/components/Footer";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { fetcSearchEvents, siteSettings } from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";
import { convertPathnameToTitle } from "@/utils/pathname-to-title";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const performerName = query.performerName as string;
  const [performerTitle, setPerformerTitle] = useState("");
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);

  useEffect(() => {
    if (performerName) setPerformerTitle(convertPathnameToTitle(performerName));
  }, [performerName]);

  useEffect(() => {
    if (performerTitle) {
      const fetchEvents = async () => {
        try {
          const response = await fetcSearchEvents({
            searchTerms: performerTitle,
            // numberOfEvents: eventNumber,
            orderByClause: "Date%20DESC",
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
  }, [performerTitle]);
  return (
    <>
      <Head>
        <title>
          {capitalizeString(performerTitle)} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative my-5">
          <Image
            src={EventBg}
            alt="event bg"
            className="w-100 rounded-5 object-cover"
          />
          <h1
            className="text-white m-0 fw-bold position-absolute text-capitalize"
            style={{ left: "16px", bottom: "16px" }}>
            {capitalizeString(performerTitle)} Tickets
          </h1>
        </div>
        <EventList
          eventNumber={eventNumber}
          setEventNumber={setEventNumber}
          events={events}
        />
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <Details performerTitle={capitalizeString(performerTitle)} />
        <NewsLetterForm />
      </main>
      <Footer />
    </>
  );
};

export default PerformerPage;
