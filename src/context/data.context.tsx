import { useState, useEffect, useContext, createContext } from "react";
import { GetCategoriesProps, GetVenueProps } from "@/types/data-types";
import axios from "axios";
import {
  SHEET_ID,
  SHEET_NAME,
  googleSheetRange,
} from "@/settings/site.settings";

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
  // performers?: GetEventPerformersProps[];
  venues: GetVenueProps[];
  images: Array<string[]>;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}>({
  categories: [],
  // performers: [],
  venues: [],
  images: [],
  searchHeroRef: { current: null },
});

export const DataProvider: React.FC<{
  children: React.ReactNode;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ searchHeroRef, children }) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const [images, setImages] = useState<Array<string[]>>([]);
  const [venues, setVenues] = useState<GetVenueProps[]>([]);

  console.log("venues", venues);

  useEffect(() => {
    const fetchVenues = async () => {
      const storedData = localStorage.getItem("venues");
      const storedTimestamp = localStorage.getItem("timestamp-venues");
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      if (
        !storedData ||
        !storedTimestamp ||
        currentTime - +storedTimestamp > oneDay
      ) {
        const response = await axios.get("/api/GetVenue");
        const data = response.data.GetVenueResult.Venue;
        console.log(response);

        localStorage.setItem("venues", JSON.stringify(data));
        localStorage.setItem("timestamp-venues", currentTime.toString());
        setVenues(data);
      } else {
        setVenues(JSON.parse(storedData));
      }
    };
    const fetchData = async () => {
      const storedData = localStorage.getItem("categories");
      const storedTimestamp = localStorage.getItem("timestamp-categories");
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      if (
        !storedData ||
        !storedTimestamp ||
        currentTime - +storedTimestamp > oneDay
      ) {
        try {
          const response = await axios.get("/api/GetCategories");
          const data = response.data.GetCategoriesResult.Category;
          setCategories(data);
          localStorage.setItem("categories", JSON.stringify(data));
          localStorage.setItem("timestamp-categories", currentTime.toString());
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setCategories(JSON.parse(storedData));
      }
    };
    const fetchAllImages = async () => {
      const storedData = localStorage.getItem("images");
      const storedTimestamp = localStorage.getItem("timestamp-images");
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      if (
        !storedData ||
        !storedTimestamp ||
        currentTime - +storedTimestamp > oneDay
      ) {
        const { data } = await axios.get("/api/fetchGoogleSheetData", {
          params: {
            sheetId: SHEET_ID,
            sheetName: SHEET_NAME,
            range: googleSheetRange,
          },
        });

        localStorage.setItem("images", JSON.stringify(data?.data));
        localStorage.setItem("timestamp-images", currentTime.toString());
        setImages(data?.data);
      } else {
        setImages(JSON.parse(storedData));
      }
    };
    fetchAllImages();
    fetchVenues();

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
