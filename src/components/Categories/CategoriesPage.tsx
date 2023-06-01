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
import axios from "axios";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

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
      categories.find(({ ParentCategoryDescription }) =>
        ParentCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  useEffect(() => {
    if (categoryData?.ParentCategoryID && eventNumber <= 500) {
      const fetchEvents = async () => {
        try {
          const response = await axios.post("/api/GetEvents", {
            parentCategoryID: categoryData.ParentCategoryID,
            orderByClause: "endDate DESC",
            numberOfEvents: eventNumber,
            // childCategoryID: categoryData.ChildCategoryID,
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
  }, [eventNumber, categoryData?.ParentCategoryID]);

  useEffect(() => {
    if (categoryData?.ParentCategoryID && categoryData?.ChildCategoryID) {
      const fetchPerformerByCategory = async () => {
        try {
          const response = await axios.post("/api/GetPerformerByCategory", {
            hasEvent: true,
            parentCategoryID: categoryData.ParentCategoryID,
            childCategoryID: categoryData.ChildCategoryID,
          });
          const data = response.data.GetPerformerByCategoryResult.Performer;
          setPerformers(data);
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchPerformerByCategory();
    }
  }, [categoryData?.ChildCategoryID, categoryData?.ParentCategoryID]);

  return (
    <>
      <main className="bg-light">
        <Hero
          title={categoryData?.ParentCategoryDescription || categoryTitle}
        />
        <div className="container">
          <Categories
            categories={removeDuplicatedElements(
              categories,
              "ParentCategoryDescription"
            ).splice(0, 8)}
          />
          <NewCategorySales
            performers={performers.splice(0, 8)}
            title={`Top National Events`}
          />
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
