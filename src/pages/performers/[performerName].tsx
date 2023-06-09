import { useEffect, useState } from "react";
import EventList from "@/components/Event/EventList";
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
import TicketInfo from "@/components/Categories/TicketInfo";

const PerformerPage: React.FC = () => {
  const { query } = useRouter();
  const { images } = useDataContext();
  const performerName = query.performerName as string;
  const [performerTitle, setPerformerTitle] = useState("");
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  const [eventNumber, setEventNumber] = useState(50);
  const [data, setData] = useState<GetEventsProps[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (eventNumber > 50) {
      setLoading(true);
      const fetchEvents = async () => {
        const response = await fetchGetEvents({
          performerName: capitalizeString(performerTitle),
          numberOfEvents: eventNumber,
          orderByClause: "Date",
          whereClause: "",
        });
        setData(response);
        setLoading(false);
      };
      fetchEvents();
    }
  }, [eventNumber, performerTitle]);

  useEffect(() => {
    if (performerName) {
      const name = convertQueryToTitle(performerName);
      setPerformerTitle(name);

      let isThereImage = false;
      if (Array.isArray(images)) {
        images.forEach((el) => {
          if (el[1].toLowerCase().includes(name)) {
            setPerformerImage(el[2]);
            isThereImage = true;
          }
        });
        if (!isThereImage) setPerformerImage(null);
      }
    }
  }, [performerName, images]);

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
            style={{
              left: "16px",
              bottom: "16px",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "6px",
            }}>
            {capitalizeString(performerTitle)} Tickets
          </h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <EventList
            eventNumber={eventNumber}
            setEventNumber={setEventNumber}
            events={data.length === 0 ? events : data}
            error={error}
            loading={loading}
          />
        )}
        {/* <Events count={8} title="Sam Morril tour venues" />
        <Events count={8} title="Popular artists near you" /> */}
        <TicketInfo categoryTitle={capitalizeString(performerTitle)} />
      </main>
    </>
  );
};

export default PerformerPage;
