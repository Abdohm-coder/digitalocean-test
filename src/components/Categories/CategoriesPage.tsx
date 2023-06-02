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
import { usePathname } from "next/navigation";
import {
  fetcGetEvents,
  fetchHighSalesPerformers,
} from "@/settings/site.settings";

const CategoriesPage: React.FC = () => {
  const pathname = usePathname();
  const categoryTitle = pathname.replace("/", "").replace("-tickets", "");
  console.log(categoryTitle);
  const [eventNumber, setEventNumber] = useState(50);
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [performers, setPerformers] = useState<GetPerfomerByCategoryProps[]>(
    []
  );

  const categoryData = useMemo(() => {
    const categories = [
      {
        ChildCategoryDescription: "BOXING",
        ChildCategoryID: 50,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "RODEO",
        ChildCategoryID: 53,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "BASEBALL",
        ChildCategoryID: 63,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "BASEBALL",
        ChildCategoryID: 63,
        GrandchildCategoryDescription: "Minors (AAA)",
        GrandchildCategoryID: 27,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "BASKETBALL",
        ChildCategoryID: 66,
        GrandchildCategoryDescription: "Other",
        GrandchildCategoryID: 29,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "GOLF",
        ChildCategoryID: 67,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "HOCKEY",
        ChildCategoryID: 68,
        GrandchildCategoryDescription: "WHL - Western",
        GrandchildCategoryID: 171,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "RACING",
        ChildCategoryID: 69,
        GrandchildCategoryDescription: "Auto",
        GrandchildCategoryID: 20,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "RACING",
        ChildCategoryID: 69,
        GrandchildCategoryDescription: "Motorcycle",
        GrandchildCategoryID: 21,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "RACING",
        ChildCategoryID: 69,
        GrandchildCategoryDescription: "Horse",
        GrandchildCategoryID: 35,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "SOCCER",
        ChildCategoryID: 71,
        GrandchildCategoryDescription: "English Premier League",
        GrandchildCategoryID: 49,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "RUGBY",
        ChildCategoryID: 77,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "SPORTS",
        ParentCategoryID: 1,
      },
      {
        ChildCategoryDescription: "JAZZ / BLUES",
        ChildCategoryID: 21,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "ALTERNATIVE",
        ChildCategoryID: 22,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "COUNTRY / FOLK",
        ChildCategoryID: 23,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "COMEDY",
        ChildCategoryID: 24,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "RAP / HIP HOP",
        ChildCategoryID: 36,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "OTHER",
        ChildCategoryID: 37,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "RELIGIOUS",
        ChildCategoryID: 43,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "R&B / SOUL",
        ChildCategoryID: 45,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "BLUEGRASS",
        ChildCategoryID: 46,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "CLASSICAL",
        ChildCategoryID: 49,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "CHILDREN / FAMILY",
        ChildCategoryID: 55,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "WORLD",
        ChildCategoryID: 57,
        GrandchildCategoryDescription: "Celtic",
        GrandchildCategoryID: 47,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "WORLD",
        ChildCategoryID: 57,
        GrandchildCategoryDescription: "General",
        GrandchildCategoryID: 48,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "HARD ROCK / METAL",
        ChildCategoryID: 61,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "POP / ROCK",
        ChildCategoryID: 62,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "LATIN",
        ChildCategoryID: 73,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "REGGAE / REGGAETON",
        ChildCategoryID: 83,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "50s / 60s ERA",
        ChildCategoryID: 87,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "TECHNO / ELECTRONIC",
        ChildCategoryID: 98,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "FESTIVAL / TOUR",
        ChildCategoryID: 100,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "CONCERTS",
        ParentCategoryID: 2,
      },
      {
        ChildCategoryDescription: "LAS VEGAS",
        ChildCategoryID: 35,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "MUSICAL / PLAY",
        ChildCategoryID: 38,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "BALLET",
        ChildCategoryID: 60,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "OTHER",
        ChildCategoryID: 74,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "OPERA",
        ChildCategoryID: 75,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "DANCE",
        ChildCategoryID: 82,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "CHILDREN / FAMILY",
        ChildCategoryID: 97,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "CIRQUE DU SOLEIL",
        ChildCategoryID: 102,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "WEST END",
        ChildCategoryID: 104,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "THEATRE",
        ParentCategoryID: 3,
      },
      {
        ChildCategoryDescription: "OTHER",
        ChildCategoryID: 33,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "FAIRS / FESTIVALS",
        ChildCategoryID: 58,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "CIRCUS",
        ChildCategoryID: 59,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "LECTURE",
        ChildCategoryID: 92,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "FILM",
        ChildCategoryID: 93,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "MUSEUM / EXHIBIT",
        ChildCategoryID: 94,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "TAPED PROGRAM (TV / RADIO)",
        ChildCategoryID: 95,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
      {
        ChildCategoryDescription: "ADULT",
        ChildCategoryID: 96,
        GrandchildCategoryDescription: "-",
        GrandchildCategoryID: 25,
        ParentCategoryDescription: "OTHER",
        ParentCategoryID: 4,
      },
    ];

    return categories.filter(({ ParentCategoryDescription }) =>
      ParentCategoryDescription.toLowerCase().includes(categoryTitle)
    );
  }, [categoryTitle]);

  console.log(categoryData);

  useEffect(() => {
    if (categoryData[0]?.ParentCategoryID && eventNumber <= 500) {
      const fetchEvents = async () => {
        try {
          const response = await fetcGetEvents({
            parentCategoryID: categoryData[0]?.ParentCategoryID,
            // orderByClause: "Date%20DESC",
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
          <Categories categories={categoryData?.slice(0, 8)} />
          {performers.length > 0 && (
            <NewCategorySales
              performers={performers.slice(0, 8)}
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
          {/* <CategoryCards categories={categories.slice(0, 3)} /> */}
          <TicketInfo categoryTitle={categoryTitle} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoriesPage;
