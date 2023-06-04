import { useEffect, useState } from "react";
import EventList from "@/components/Event/EventList";
import NewsLetterForm from "@/components/NewsLetterForm";
import Details from "@/components/Event/Details";
import { GetEventsProps } from "@/types/data-types";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { fetchGetEvents, siteSettings } from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";
import { convertQueryToTitle } from "@/utils/query-to-title";
import { useDataContext } from "@/context/data.context";
import DefaultImage from "@/assets/images/default.jpg";
import Loading from "@/components/Loading";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const { images } = useDataContext();
  const performerName = query.performerName as string;
  const [performerTitle, setPerformerTitle] = useState("");
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);
  const [loading, setLoading] = useState<number | null>(0);

  useEffect(() => {
    if (performerName) {
      const name = convertQueryToTitle(performerName);
      let isThereImage = false;
      images.forEach((el) => {
        console.log(el);
        if (el[1].toLowerCase().includes(name)) {
          setPerformerImage(el[2]);
          isThereImage = true;
        }
      });
      if (!isThereImage) setPerformerImage(null);
      setPerformerTitle(name);
    }
  }, [performerName, images]);

  console.log(performerImage);

  useEffect(() => {
    if (performerTitle) {
      const fetchEvents = async () => {
        try {
          const response = await fetchGetEvents(
            {
              performerName: capitalizeString(performerTitle),
              numberOfEvents: eventNumber,
              orderByClause: "Date",
              whereClause: "",
            },
            setLoading
          );
          setEvents(response || []);
          console.log(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    }
  }, [eventNumber, performerTitle]);
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
            src={performerImage ?? DefaultImage}
            alt={`${performerTitle} image`}
            width={1200}
            height={300}
            className="w-100 rounded-5 object-cover"
          />
          <h1
            className="text-white m-0 fw-bold position-absolute text-capitalize"
            style={{ left: "16px", bottom: "16px" }}>
            {capitalizeString(performerTitle)} Tickets
          </h1>
        </div>

        {loading && loading < 100 ? (
          <Loading progress={loading} />
        ) : (
          <EventList
            eventNumber={eventNumber}
            setEventNumber={setEventNumber}
            events={events}
          />
        )}
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <Details performerTitle={capitalizeString(performerTitle)} />
        <NewsLetterForm />
      </main>
    </>
  );
};

export default PerformerPage;
