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
import useSWR, { Fetcher } from "swr";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const { images } = useDataContext();
  const performerName = query.performerName as string;
  const [performerTitle, setPerformerTitle] = useState("");
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  const [eventNumber, setEventNumber] = useState(50);

  const fetchEvents: Fetcher<GetEventsProps[]> = async () => {
    const response = await fetchGetEvents({
      performerName: capitalizeString(performerTitle),
      numberOfEvents: eventNumber,
      orderByClause: "Date",
      whereClause: "",
    });
    return response;
  };

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(
    performerTitle ? `${performerTitle}-performer-events` : null,
    fetchEvents,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000, // Refresh every 1 hour
    }
  );

  useEffect(() => {
    if (performerName) {
      const name = convertQueryToTitle(performerName);
      setPerformerTitle(name);

      let isThereImage = false;
      if (Array.isArray(images)) {
        images.forEach((el) => {
          console.log(el);
          if (el[1].toLowerCase().includes(name)) {
            setPerformerImage(el[2]);
            isThereImage = true;
          }
        });
        if (!isThereImage) setPerformerImage(null);
      }
    }
  }, [performerName, images]);

  console.log("performerEvents: ", events);

  return (
    <>
      <Head>
        <title>
          {capitalizeString(performerTitle)} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="container">
        <div className="position-relative card-img">
          <Image
            loading="lazy"
            src={performerImage ?? DefaultImage}
            alt={`${performerTitle} image`}
            width={1200}
            height={300}
            className="w-100 object-cover object-img"
          />
          <h1
            className="text-white m-0 fw-bold position-absolute text-capitalize"
            style={{ left: "16px", bottom: "16px" }}>
            {capitalizeString(performerTitle)} Tickets
          </h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <EventList
            eventNumber={eventNumber}
            setEventNumber={setEventNumber}
            events={events}
            error={error}
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
