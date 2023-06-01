import { useState, useEffect, useContext, createContext } from "react";
import axios from "../axios-instance";
import { GetCategoriesProps } from "@/types/data-types";

export const DataContext = createContext<{
  categories: GetCategoriesProps[];
}>({
  categories: [],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);

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

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataContext must used inside DataProvider");

  return context;
};
