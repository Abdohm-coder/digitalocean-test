import { useState, useEffect, useMemo } from "react";
import Categories from "./Categories";
import Hero from "./Hero";
import TopNationalEvents from "./TopNationalEvents";
import EventList from "../Event/EventList";
import Guarantee from "./Guarantee";
import TicketInfo from "./TicketInfo";
import { useDataContext } from "../../context/data.context";
import {
  GetEventsProps,
  GetPerfomerByCategoryProps,
} from "../../types/data-types";
import { usePathname } from "next/navigation";
import {
  fetchGetEvents,
  fetchHighSalesPerformers,
} from "@/settings/site.settings";

const CategoriesPage: React.FC = () => {
  const pathname = usePathname();
  const { categories } = useDataContext();
  const categoryTitle = pathname.replace("/", "").replace("-tickets", "");
  console.log(categoryTitle);
  const [eventNumber, setEventNumber] = useState(50);
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [performers, setPerformers] = useState<GetPerfomerByCategoryProps[]>(
    []
  );

  const categoryData = useMemo(() => {
    return categories.filter(({ ParentCategoryDescription }) =>
      ParentCategoryDescription.toLowerCase().includes(categoryTitle)
    );
  }, [categories, categoryTitle]);

  console.log(categoryData);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID) {
      const fetchEvents = async () => {
        try {
          const response = await fetchGetEvents({
            parentCategoryID: categoryData[0]?.ParentCategoryID,
            orderByClause: "Date ASC",
            whereClause: "",
            // numberOfEvents: eventNumber,
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
  }, [categoryData]);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID) {
      const fetchPerformerByCategory = async () => {
        try {
          const response = await fetchHighSalesPerformers({
            numReturned: 8,
            parentCategoryID: categoryData[0].ParentCategoryID,
          });
          setPerformers(response || []);
          console.log(response || []);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchPerformerByCategory();
    }
  }, [categoryData]);

  return (
    <>
      <main className="bg-light">
        <Hero title={categoryTitle} />
        <div className="container">
          <Categories categories={categoryData?.slice(0, 8)} />
          {performers.length > 0 && (
            <section className="mt-3">
              <h3 className="fw-bold text-capitalize">Top National Events</h3>
              <div className="d-flex overflow-auto flex-lg-wrap">
                {performers.slice(0, 8).map(({ Description, ID }) => (
                  <TopNationalEvents key={ID} name={Description} />
                ))}
              </div>
            </section>
          )}
          <div className="row my-5">
            <div className="col-12 col-lg-8">
              <EventList
                eventNumber={eventNumber}
                setEventNumber={setEventNumber}
                events={events}
              />
            </div>
            <div className="col-4 d-none d-lg-block">
              <Guarantee />
            </div>
          </div>
          {/* <CategoryCards categories={categories.slice(0, 3)} /> */}
          <TicketInfo categoryTitle={categoryTitle} />
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
