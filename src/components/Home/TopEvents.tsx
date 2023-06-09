import React, { useEffect, useState } from "react";
import { fetchGetEvents } from "@/settings/site.settings";
import { GetEventsProps } from "@/types/data-types";

import TopEventCard from "./TopEventCard";

interface props {
  title: string;
}

const TopEvents: React.FC<props> = ({ title }) => {
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchGetEvents({
          orderByClause: "Clicks",
          whereClause: "",
          numberOfEvents: 3,
        });
        setEvents(response || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEvents();
  }, []);
  return (
    <section className="pt-5">
      <h3 className="text-danger">{title}</h3>
      <div className="row mt-3 g-0">
        {events.map((event) => (
          <TopEventCard key={event.ID} {...event} />
        ))}
      </div>
    </section>
  );
};

export default TopEvents;
