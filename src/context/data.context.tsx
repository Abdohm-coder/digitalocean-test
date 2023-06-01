import { useState, useEffect, useContext, createContext } from "react";
import {
  GetCategoriesProps,
  GetEventPerformersProps,
} from "@/types/data-types";
import axios from "axios";

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
  performers: GetEventPerformersProps[];
}>({
  categories: [],
  performers: [],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const [performers, setPerformers] = useState<GetEventPerformersProps[]>([]);

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
    const fetchPerformers = async () => {
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
    fetchPerformers();
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories, performers }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataContext must used inside DataProvider");

  return context;
};
