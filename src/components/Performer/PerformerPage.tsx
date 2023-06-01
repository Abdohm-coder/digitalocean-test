import { useEffect, useState } from "react";
import EventBg from "../../assets/images/EventBg.webp";
import EventList from "../Event/EventList";
import NewsLetterForm from "../NewsLetterForm";
import Details from "../Event/Details";
import Footer from "../Footer";
import { GetEventsProps } from "../../types/data-types";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const performerName = query.performerName as string;
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  useEffect(() => {
    if (performerName) {
      const fetchEvents = async () => {
        try {
          const response = await axios.post("/api/GetEvents", {
            performerName,
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
  }, [performerName]);
  return (
    <>
      <main className="container">
        <div className="position-relative my-5">
          <Image src={EventBg} alt="event bg" className="w-100 rounded-5" />
          <h1
            className="text-white m-0 fw-bold position-absolute "
            style={{ left: "16px", bottom: "16px" }}>
            {performerName?.replaceAll("-", " ")} Tickets
          </h1>
        </div>
        <EventList events={events} />
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
