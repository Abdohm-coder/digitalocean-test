import { useEffect, useMemo, useState } from "react";
import {
  GetEventsProps,
  GetPerfomerByCategoryProps,
} from "../../types/data-types";
import axios from "../../axios-instance";
import { useDataContext } from "../../context/data.context";
import { convertPathnameToTitle } from "../../utils/pathname-to-title";
import { useRouter } from "next/router";
import Hero from "@/components/Categories/Hero";
import EventList from "@/components/Event/EventList";
import Guarantee from "@/components/Categories/Guarantee";
import TicketInfo from "@/components/Categories/TicketInfo";

const CategoryPage: React.FC = () => {
  const { categories } = useDataContext();

  const { query } = useRouter();
  const categoryName = query.categoryName as string;
  const [categoryTitle, setCategoryTitle] = useState("");

  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [_, setPerformers] = useState<GetPerfomerByCategoryProps[]>([]);
  const categoryData = useMemo(
    () =>
      categories.find(({ ChildCategoryDescription }) =>
        ChildCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  useEffect(() => {
    if (categoryName) setCategoryTitle(convertPathnameToTitle(categoryName));
  }, [categoryName]);
  useEffect(() => {
    if (categoryData?.ChildCategoryID) {
      const fetchEvents = async () => {
        try {
          const response = await axios.post("/api/GetEvents", {
            parentCategoryID: categoryData.ParentCategoryID,
            childCategoryID: categoryData.ChildCategoryID,
          });
          const data = response.data.GetEventsResult.Event;
          setEvents(data);
          console.log(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const fetchPerformerByCategory = async () => {
        try {
          const response = await axios.post("/api/GetPerfomersByCategory", {
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
      fetchEvents();
      fetchPerformerByCategory();
    }
  }, [categoryData?.ChildCategoryID, categoryData?.ParentCategoryID]);

  return (
    <>
      <main className="bg-light">
        <Hero title={categoryData?.ChildCategoryDescription || categoryTitle} />
        <div className="container">
          <div className="row my-5">
            <div className="col-12 col-lg-8">
              <EventList events={events} />
            </div>
            <div className="col-4 d-none d-lg-block">
              <Guarantee />
            </div>
          </div>
          {/* <CategoryCards categories={categories.splice(0, 3)} /> */}
          <TicketInfo />
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
