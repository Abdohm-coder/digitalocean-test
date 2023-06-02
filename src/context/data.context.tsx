import { useState, useEffect, useContext, createContext } from "react";
import {
  GetCategoriesProps,
  GetEventPerformersProps,
  GetVenueProps,
} from "@/types/data-types";
import axios from "axios";
import {
  googleSheetID,
  googleSheetName,
  googleSheetRange,
} from "@/settings/site.settings";

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
  performers: GetEventPerformersProps[];
  venues: GetVenueProps[];
  images: Array<string[]>;
}>({
  categories: [],
  performers: [],
  venues: [],
  images: [],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const [performers, setPerformers] = useState<GetEventPerformersProps[]>([]);
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
          sheetId: googleSheetID,
          sheetName: googleSheetName,
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
    <DataContext.Provider value={{ categories, performers, venues, images }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataContext must used inside DataProvider");

  return context;
};
