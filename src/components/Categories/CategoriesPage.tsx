import { useState, useEffect, useMemo } from "react";
import Categories from "./Categories";
import Hero from "./Hero";
import NewCategorySales from "./NewCategorySales";
import EventList from "../Event/EventList";
import Guarantee from "./Guarantee";
import TicketInfo from "./TicketInfo";
import Footer from "../Footer";
import { useDataContext } from "../../context/data.context";
import {
  GetEventsProps,
  GetPerfomerByCategoryProps,
} from "../../types/data-types";
import { convertPathnameToTitle } from "../../utils/pathname-to-title";
import { usePathname } from "next/navigation";
import {
  fetcGetEvents,
  fetchHighSalesPerformers,
} from "@/settings/site.settings";

const CategoriesPage: React.FC = () => {
  const { categories } = useDataContext();

  const pathname = usePathname();
  const categoryTitle = convertPathnameToTitle(pathname);
  console.log();
  const [eventNumber, setEventNumber] = useState(50);
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [performers, setPerformers] = useState<GetPerfomerByCategoryProps[]>(
    []
  );

  const categoryData = useMemo(
    () =>
      categories.filter(({ ParentCategoryDescription }) =>
        ParentCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID && eventNumber <= 500) {
      const fetchEvents = async () => {
        try {
          const response = await fetcGetEvents({
            parentCategoryID: categoryData[0]?.ParentCategoryID,
            orderByClause: "Date%20DESC",
            numberOfEvents: eventNumber,
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
  }, [categoryData, eventNumber]);

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
          <Categories categories={categoryData?.splice(0, 8)} />
          {performers.length > 0 && (
            <NewCategorySales
              performers={performers.splice(0, 8)}
              title={`Top National Events`}
            />
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
          {/* <CategoryCards categories={categories.splice(0, 3)} /> */}
          <TicketInfo categoryTitle={categoryTitle} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoriesPage;
