import { useEffect, useState } from "react";
import EventBg from "@/assets/images/EventBg.webp";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import Details from "@/components/Event/Details";
import Footer from "@/components/Footer";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import { siteSettings } from "@/settings/site.settings";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const performerName = query.performerName as string;
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);

  useEffect(() => {
    if (performerName) {
      const fetchEvents = async () => {
        try {
          const response = await axios.post("/api/GetEvents", {
            performerName,
            numberOfEvents: eventNumber,
          });
          const data = response.data.GetEventsResult.Event;
          setEvents(data);
          console.log(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    } else {
      console.log("error event id");
    }
  }, [eventNumber, performerName]);
  return (
    <>
      <Head>
        <title>
          {performerName} Tickets | {siteSettings.site_name}
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
            className="text-white m-0 fw-bold position-absolute "
            style={{ left: "16px", bottom: "16px" }}>
            {performerName?.replaceAll("-", " ")} Tickets
          </h1>
        </div>
        <EventList setEventNumber={setEventNumber} events={events} />
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <Details />
        <NewsLetterForm />
      </main>
      <Footer />
    </>
  );
};

export default PerformerPage;
