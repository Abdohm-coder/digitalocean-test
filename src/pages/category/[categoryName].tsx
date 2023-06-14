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
import useSWR, { Fetcher } from "swr";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

const CategoryPage: React.FC = () => {
  const { categories } = useDataContext();

  const { query } = useRouter();
  const categoryName = query.categoryName as string;
  const [categoryTitle, setCategoryTitle] = useState("");
  const [data, setData] = useState<GetEventsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [eventNumber, setEventNumber] = useState(50);
  const categoryData = useMemo(
    () =>
      categories.filter(
        ({ ChildCategoryDescription, GrandchildCategoryDescription }) =>
          ChildCategoryDescription.toLowerCase().includes(categoryTitle) ||
          GrandchildCategoryDescription.toLowerCase().includes(categoryTitle)
      ),
    [categories, categoryTitle]
  );

  const fetchEvents: Fetcher<GetEventsProps[]> = async () => {
    const response = await fetchGetEvents({
      parentCategoryID: categoryData[0].ParentCategoryID,
      childCategoryID: categoryData[0].ChildCategoryID,
      orderByClause: "Date",
      whereClause: "",
      numberOfEvents: eventNumber,
    });
    return response;
  };

  useEffect(() => {
    if (eventNumber > 50 && categoryData.length > 0) {
      setLoading(true);
      const fetchEvents = async () => {
        const response = await fetchGetEvents({
          parentCategoryID: categoryData[0].ParentCategoryID,
          childCategoryID: categoryData[0].ChildCategoryID,
          orderByClause: "Date",
          whereClause: "",
          numberOfEvents: eventNumber,
        });
        setData(response);
      };
      fetchEvents();
      setLoading(false);
    }
  }, [eventNumber, categoryData]);

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(
    categoryData[0]?.ChildCategoryID
      ? `${categoryData[0]?.ParentCategoryID}-${categoryData[0]?.ChildCategoryID}-category-events`
      : null,
    fetchEvents,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000, // Refresh every 1 hour
    }
  );

  const fetchPerformers: Fetcher<GetPerfomerByCategoryProps[]> = async () => {
    const response = await fetchPerformerByCategory({
      hasEvent: true,
      parentCategoryID: categoryData[0].ParentCategoryID,
      childCategoryID: categoryData[0].ChildCategoryID,
    });
    return response;
  };

  const { data: performers } = useSWR(
    categoryData[0]?.ChildCategoryID
      ? `${categoryData[0]?.ParentCategoryID}-${categoryData[0]?.ChildCategoryID}-category-performers`
      : null,
    fetchPerformers,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000, // Refresh every 1 hour
    }
  );

  useEffect(() => {
    if (categoryName) {
      const name = convertQueryToTitle(categoryName);
      setCategoryTitle(name);
    }
  }, [categoryName]);

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
          {Array.isArray(performers) && performers.length > 0 && (
            <section className="mt-3">
              <h3 className="fw-bold text-capitalize">Top National Events</h3>
              <div className="d-flex overflow-auto flex-lg-wrap">
                {removeDuplicatedElements(performers, "Description")
                  .slice(0, 8)
                  .map(({ Description, ID }) => (
                    <TopNationalEvents key={ID} name={Description} />
                  ))}
              </div>
            </section>
          )}
        </div>

        <div className="container">
          <div className="row my-5">
            <div className="col-12 col-lg-8">
              {isLoading || loading ? (
                <Loading />
              ) : (
                <EventList
                  eventNumber={eventNumber}
                  setEventNumber={setEventNumber}
                  events={eventNumber > 50 ? data : events}
                  error={error}
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
