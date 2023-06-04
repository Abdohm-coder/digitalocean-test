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

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
  performers: GetEventPerformersProps[];
  venues: GetVenueProps[];
  images: Array<string[]>;
  performerID: number | null;
  setPerformerID: React.Dispatch<React.SetStateAction<number | null>>;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}>({
  categories: [],
  performers: [],
  venues: [],
  images: [],
  performerID: null,
  setPerformerID: () => {},
  searchHeroRef: { current: null },
});

export const DataProvider: React.FC<{
  children: React.ReactNode;
  searchHeroRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ searchHeroRef, children }) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const [performers, setPerformers] = useState<GetEventPerformersProps[]>([]);
  const [performerID, setPerformerID] = useState<number | null>(null);
  const [venues, setVenues] = useState<GetVenueProps[]>([]);
  const [images, setImages] = useState<Array<string[]>>([]);

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
    const fetchAllVenues = async () => {
      const storedData = localStorage.getItem("venues");
      const storedTimestamp = localStorage.getItem("timestamp");
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      if (
        !storedData ||
        !storedTimestamp ||
        currentTime - +storedTimestamp > oneDay
      ) {
        try {
          const response = await axios.get("/api/GetVenue");
          const newData = response.data.GetVenueResult.Venue;

          localStorage.setItem("venues", JSON.stringify(newData));
          localStorage.setItem("timestamp", currentTime.toString());

          setVenues(newData);
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      } else {
        setVenues(JSON.parse(storedData));
      }
    };
    const fetchAllPerformers = async () => {
      const storedData = localStorage.getItem("perfomers");
      const storedTimestamp = localStorage.getItem("timestamp");
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      if (
        !storedData ||
        !storedTimestamp ||
        currentTime - +storedTimestamp > oneDay
      ) {
        try {
          const response = await axios.get("/api/GetEventPerformers");
          const newData = response.data.GetEventPerformersResult.EventPerformer;

          localStorage.setItem("perfomers", JSON.stringify(newData));
          localStorage.setItem("timestamp", currentTime.toString());

          setPerformers(newData);
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      } else {
        setPerformers(JSON.parse(storedData));
      }
    };

    const fetchImages = async () => {
      const { data } = await axios.get("/api/fetchGoogleSheetData", {
        params: {
          sheetId: SHEET_ID,
          sheetName: SHEET_NAME,
          range: googleSheetRange,
        },
      });
      // @ts-ignore
      setImages(data.data);
    };
    fetchImages();
    fetchAllVenues();
    fetchAllPerformers();
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        performers,
        venues,
        images,
        performerID,
        setPerformerID,
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
