import { useEffect, useMemo, useState } from "react";
import {
  GetEventsProps,
  GetPerfomerByCategoryProps,
} from "../../types/data-types";
import { useDataContext } from "../../context/data.context";
import { convertQueryToTitle } from "../../utils/query-to-title";
import { useRouter } from "next/router";
import Hero from "@/components/Categories/Hero";
import EventList from "@/components/Event/EventList";
import Guarantee from "@/components/Categories/Guarantee";
import TicketInfo from "@/components/Categories/TicketInfo";
import Head from "next/head";
import {
  fetchGetEvents,
  fetchPerformerByCategory,
  siteSettings,
} from "@/settings/site.settings";
import { capitalizeString } from "@/utils/capitalize-string";
import TopNationalEvents from "@/components/Categories/TopNationalEvents";
import Loading from "@/components/Loading";

const CategoryPage: React.FC = () => {
  const { categories } = useDataContext();

  const { query } = useRouter();
  const categoryName = query.categoryName as string;
  const [categoryTitle, setCategoryTitle] = useState("");

  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [eventNumber, setEventNumber] = useState(50);
  const [performers, setPerformers] = useState<GetPerfomerByCategoryProps[]>(
    []
  );
  const categoryData = useMemo(
    () =>
      categories.filter(({ ChildCategoryDescription }) =>
        ChildCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  useEffect(() => {
    if (categoryName) {
      const name = convertQueryToTitle(categoryName);
      setCategoryTitle(name);
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID) {
      const fetchData = async () => {
        try {
          const response = await fetchPerformerByCategory({
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
      fetchData();
    }
  }, [categoryData]);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID) {
      const fetchEvents = async () => {
        try {
          const response = await fetchGetEvents(
            {
              parentCategoryID: categoryData[0].ParentCategoryID,
              childCategoryID: categoryData[0].ChildCategoryID,
              orderByClause: "Date",
              whereClause: "",
              numberOfEvents: eventNumber,
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
        </div>

        <div className="container">
          <div className="row my-5">
            <div className="col-12 col-lg-8">
              {loading ? (
                <Loading />
              ) : (
                <EventList
                  eventNumber={eventNumber}
                  setEventNumber={setEventNumber}
                  events={events}
                />
              )}
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

export default CategoryPage;
