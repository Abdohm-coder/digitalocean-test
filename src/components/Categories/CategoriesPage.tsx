import { useState, useMemo } from "react";
import Categories from "./Categories";
import Hero from "./Hero";
import TopNationalEvents from "./TopNationalEvents";
import EventList from "../Event/EventList";
import Guarantee from "./Guarantee";
import TicketInfo from "./TicketInfo";
import { useDataContext } from "../../context/data.context";
import {
  GetEventsProps,
  GetHighSalesPerformersProps,
} from "../../types/data-types";
import { usePathname } from "next/navigation";
import {
  fetchGetEvents,
  fetchHighSalesPerformers,
} from "@/settings/site.settings";
import Loading from "../Loading";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
import useSWR, { Fetcher } from "swr";

const CategoriesPage: React.FC = () => {
  const pathname = usePathname();
  const { categories } = useDataContext();
  const categoryTitle = pathname.replace("/", "").replace("-tickets", "");
  const [eventNumber, setEventNumber] = useState(50);

  const categoryData = useMemo(() => {
    return categories.filter(({ ParentCategoryDescription }) =>
      ParentCategoryDescription.toLowerCase().includes(categoryTitle)
    );
  }, [categories, categoryTitle]);

  const fetchEvents: Fetcher<GetEventsProps[]> = async () => {
    const response = await fetchGetEvents({
      parentCategoryID: categoryData[0]?.ParentCategoryID,
      orderByClause: "Date ASC",
      whereClause: "",
      numberOfEvents: eventNumber,
    });
    return response;
  };

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(
    categoryData[0]?.ParentCategoryID
      ? `${categoryData[0]?.ParentCategoryID}-category-events`
      : null,
    fetchEvents,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000, // Refresh every 1 hour
    }
  );

  const fetchPerformers: Fetcher<GetHighSalesPerformersProps[]> = async () => {
    const response = await fetchHighSalesPerformers({
      numReturned: 16,
      parentCategoryID: categoryData[0].ParentCategoryID,
    });
    return response;
  };

  const { data: performers } = useSWR(
    categoryData[0]?.ParentCategoryID
      ? `${categoryData[0]?.ParentCategoryID}-category-performers`
      : null,
    fetchPerformers,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000, // Refresh every 1 hour
    }
  );

  return (
    <>
      <main className="bg-light">
        <Hero title={categoryTitle} />
        <div className="container">
          <Categories
            categories={removeDuplicatedElements(
              categoryData,
              "ChildCategoryDescription"
            )?.slice(0, 8)}
          />
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
          <div className="row my-5">
            <div className="col-12 col-lg-8">
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
