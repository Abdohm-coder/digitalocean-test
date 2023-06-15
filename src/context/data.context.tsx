import { useState, useEffect, useContext, createContext } from "react";
import { GetCategoriesProps, GetVenueProps } from "@/types/data-types";
import axios from "axios";
import {
  SHEET_ID,
  SHEET_NAME,
  googleSheetRange,
} from "@/settings/site.settings";
import { AES, enc } from "crypto-js";

const encryptionKey = "7K9$?rZ*jE52T!#Xq%u@d6nP";

// Function to encrypt sensitive data using AES encryption
function encryptData(data: any) {
  const encryptedData = AES.encrypt(
    JSON.stringify(data),
    encryptionKey
  ).toString();
  return encryptedData;
}

// Function to decrypt previously encrypted data
function decryptData(encryptedData: any) {
  const decryptedBytes = AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = JSON.parse(decryptedBytes.toString(enc.Utf8));
  return decryptedData;
}

// Function to store data in localStorage with encryption
function storeData(key: string, data: any, expirationHours: number) {
  const encryptedData = encryptData(data);
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + expirationHours * 60 * 60 * 1000
  );

  const dataWithExpiration = {
    data: encryptedData,
    expiresAt: expirationDate.getTime(),
  };

  localStorage.setItem(key, JSON.stringify(dataWithExpiration));
}

// Function to retrieve and decrypt data from localStorage
function retrieveData(key: string) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const { data, expiresAt } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    if (currentTime < expiresAt) {
      const decryptedData = decryptData(data);
      return decryptedData;
    } else {
      // Clear expired data from localStorage
      localStorage.removeItem(key);
    }
  }
  return null;
}

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
      const cachedVenues = retrieveData("venues-data");

      if (!cachedVenues) {
        try {
          const response = await axios.get("/api/GetVenue");
          const data = response.data.GetVenueResult.Venue;

          console.log("Response from Venues",response);
          storeData("venues-data", data, 24);
          setVenues(data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setVenues(cachedVenues);
      }
    };
    const fetchCategories = async () => {
      const cachedCategories = retrieveData("categories-data");

      if (!cachedCategories) {
        try {
          const response = await axios.get("/api/GetCategories");
          const data = response.data.GetCategoriesResult.Category;

          setCategories(data);
          storeData("categories-data", data, 24);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setCategories(cachedCategories);
      }
    };
    const fetchAllImages = async () => {
      const cachedImages = retrieveData("performerimg");

      if (!cachedImages) {
        const { data } = await axios.get("/api/fetchGoogleSheetData", {
          params: {
            sheetId: SHEET_ID,
            sheetName: SHEET_NAME,
            range: googleSheetRange,
          },
        });

        storeData("performerimg", data?.data, 24);
        setImages(data?.data);
      } else {
        setImages(cachedImages);
      }
    };
    fetchAllImages();
    fetchVenues();

    fetchCategories();
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
