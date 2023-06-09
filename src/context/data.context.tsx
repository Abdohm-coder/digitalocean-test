import { useState, useEffect, useContext, createContext } from "react";
import {
  GetCategoriesProps,
  GetEventPerformersProps,
  GetVenueProps,
} from "@/types/data-types";
import axios from "axios";
import {
  SHEET_ID,
  SHEET_NAME,
  googleSheetRange,
} from "@/settings/site.settings";
import useSWR from "swr";

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
  performers?: GetEventPerformersProps[];
  venues?: GetVenueProps[];
  images?: Array<string[]>;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}>({
  categories: [],
  performers: [],
  venues: [],
  images: [],
  searchHeroRef: { current: null },
});

export const DataProvider: React.FC<{
  children: React.ReactNode;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ searchHeroRef, children }) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  // const [performers, setPerformers] = useState<GetEventPerformersProps[]>([]);
  const { data: images } = useSWR(
    "images",
    async () => {
      const { data } = await axios.get("/api/fetchGoogleSheetData", {
        params: {
          sheetId: SHEET_ID,
          sheetName: SHEET_NAME,
          range: googleSheetRange,
        },
      });
      return data;
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 * 24, // Refresh every 24 hour
    }
  );
  const { data: venues } = useSWR(
    "venues",
    async () => {
      const response = await axios.get("/api/GetVenue");
      const data = response.data.GetVenueResult.Venue;

      return data;
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 * 24, // Refresh every 24 hour
    }
  );

  console.log(venues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/GetCategories");
        const data = response.data.GetCategoriesResult.Category;
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // const fetchAllPerformers = async () => {
    //   const storedData = localStorage.getItem("perfomers");
    //   const storedTimestamp = localStorage.getItem("timestamp");
    //   const currentTime = new Date().getTime();
    //   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    //   if (
    //     !storedData ||
    //     !storedTimestamp ||
    //     currentTime - +storedTimestamp > oneDay
    //   ) {
    //     try {
    //       const response = await axios.get("/api/GetEventPerformers");
    //       const newData = response.data.GetEventPerformersResult.EventPerformer;

    //       localStorage.setItem("perfomers", JSON.stringify(newData));
    //       localStorage.setItem("timestamp", currentTime.toString());

    //       setPerformers(newData);
    //     } catch (error) {
    //       console.error("Error:", error);
    //       throw error;
    //     }
    //   } else {
    //     setPerformers(JSON.parse(storedData));
    //   }
    // };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        // performers,
        venues,
        images,
        searchHeroRef,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataContext must used inside DataProvider");

  return context;
};
