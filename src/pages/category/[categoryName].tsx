import { useEffect, useMemo, useState } from "react";
import {
  GetEventsProps,
  GetPerfomerByCategoryProps,
} from "../../types/data-types";
import { useDataContext } from "../../context/data.context";
import { convertPathnameToTitle } from "../../utils/pathname-to-title";
import { useRouter } from "next/router";
import Hero from "@/components/Categories/Hero";
import EventList from "@/components/Event/EventList";
import Guarantee from "@/components/Categories/Guarantee";
import TicketInfo from "@/components/Categories/TicketInfo";
import Head from "next/head";
import {
  fetcGetEvents,
  fetcPerformerByCategory,
  siteSettings,
} from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";

const CategoryPage: React.FC = () => {
  const { categories } = useDataContext();

  const { query } = useRouter();
  const categoryName = query.categoryName as string;
  const [categoryTitle, setCategoryTitle] = useState("");

  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);
  const [_, setPerformers] = useState<GetPerfomerByCategoryProps[]>([]);
  const categoryData = useMemo(
    () =>
      categories.filter(({ ChildCategoryDescription }) =>
        ChildCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  useEffect(() => {
    if (categoryName) setCategoryTitle(convertPathnameToTitle(categoryName));
  }, [categoryName]);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID) {
      const fetchPerformerByCategory = async () => {
        try {
          const response = await fetcPerformerByCategory({
            hasEvent: true,
            parentCategoryID: categoryData[0].ParentCategoryID,
            childCategoryID: categoryData[0].ChildCategoryID,
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

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID && eventNumber <= 500) {
      const fetchEvents = async () => {
        try {
          const response = await fetcGetEvents({
            parentCategoryID: categoryData[0].ParentCategoryID,
            childCategoryID: categoryData[0].ChildCategoryID,
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

  return (
    <>
      <Head>
        <title>
          {capitalizeString(categoryTitle)} Tickets | {siteSettings.site_name}
        </title>
      </Head>
      <main className="bg-light">
        <Hero title={categoryTitle} />
        <div className="container">
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
    </>
  );
};

export default CategoryPage;
