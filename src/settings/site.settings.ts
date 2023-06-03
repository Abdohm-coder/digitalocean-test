import axios from "axios";
import Logo from "../assets/images/logo.png";
import {
  GetEventTickets3Input,
  GetEventsInput,
  GetHighInventoryPerformersInput,
  GetHighSalesPerformersInput,
  GetPerformerByCategoryInput,
  SearchEventsInput,
  SearchPerformersInput,
} from "@/types/input-calls-types";

export const baseApi = "https://ticketjewel.com";

export const googleSheetID = "1Ojnkc4IaJcXjuh-A20xCsc8pR8pMFIJfS7rFP_DoMlQ"; // Sheet ID
export const googleSheetName = "Sheet1"; // Sheet Name
export const googleSheetRange = "A:C"; // The range of cells

export const siteSettings = {
  site_name: "Ticketjewel",
  logo: {
    src: Logo,
    alt: "Ticketjewel",
    height: 30,
  },
  hero_text: {
    title: "Meet your favorite",
    p: "Artists, sport teams and parties",
  },
  main_categories: [
    {
      title: "Concerts",
      id: 2,
      link: "/concerts-tickets",
      top_events: [
        {
          event_title: "Maluma",
          event_link: "/performers/Maluma",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/62059/62059-300x300.jpg",
        },
        {
          event_title: "Billy Idol",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/119/119-300x300.jpg",
        },
        {
          event_title: "Jackson Browne",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/1531/1531-300x300.jpg",
        },
        {
          event_title: "Garth Brooks",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/391/391-300x300.jpg",
        },
        {
          event_title: "Niall Horan",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/102147/102147-300x300.jpg",
        },
        {
          event_title: "Stevie Nicks",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/3668/3668-300x300.jpg",
        },
        {
          event_title: "Suicideboys",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/101554/101554-300x300.jpg",
        },
        {
          event_title: "Romeo Santos",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/52131/52131-300x300.jpg",
        },
      ],
    },
    {
      title: "Sports",
      id: 1,
      link: "/sports-tickets",
      top_events: [
        {
          event_title: "NFL Football",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/38219/38219-300x300.jpg",
        },
        {
          event_title: "MLB Baseball",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/102180/102180-300x300.jpg",
        },
        {
          event_title: "NBA Basketball",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/7535/7535-300x300.jpg",
        },
        {
          event_title: "NHL Hockey",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/32013/32013-300x300.jpg",
        },
        {
          event_title: "Monster Jam",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/2541/2541-300x300.jpg",
        },
        {
          event_title: "Soccer Champions Tour",
          event_link: "/",
          event_image_src:
            "https://d3b7ca3kks92i5.cloudfront.net/performer/196893/196893-300x300.jpg",
        },
        {
          event_title: "CONCACAF Gold Cup",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/71297/71297-300x300.jpg",
        },
        {
          event_title: "US Open Tennis Championship",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/10217/10217-300x300.jpg",
        },
      ],
    },
    {
      title: "Theater",
      id: 2,
      link: "/theater-tickets",
      top_events: [
        {
          event_title: "Hamilton",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/68098/68098-300x300.jpg",
        },
        {
          event_title: "The Lion King",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/3160/3160-300x300.jpg",
        },
        {
          event_title: "Disney on Ice",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/17332/17332-300x300.jpg",
        },
        {
          event_title: "The Music Man",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/104478/104478-300x300.jpg",
        },
        {
          event_title: "The Phantom Of The Opera",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/811/811-300x300.jpg",
        },
        {
          event_title: "Wicked",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/1145/1145-300x300.jpg",
        },
        {
          event_title: "Moulin Rouge!",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/28869/28869-300x300.jpg",
        },
        {
          event_title: "Aladdin",
          event_link: "/",
          event_image_src:
            "https://scorebig-brand.s3.amazonaws.com/images/performer/2785/2785-300x300.jpg",
        },
      ],
    },
  ],
};

export const fetchHighSalesPerformers = async (
  params: GetHighSalesPerformersInput
) => {
  try {
    const response = await axios.post("/api/GetHighSalesPerformers", params);
    const data = response.data.GetHighSalesPerformersResult.PerformerPercent;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchHighInventoryPerformers = async (
  params: GetHighInventoryPerformersInput
) => {
  try {
    const response = await axios.post("/api/GetHighInventoryPerformers", params);
    const data = response.data.GetHighInventoryPerformersResult.PerformerPercent;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchPerformerByCategory = async (
  params: GetPerformerByCategoryInput
) => {
  try {
    const response = await axios.post("/api/GetPerformerByCategory", params);
    const data = response.data.GetPerformerByCategoryResult.Performer;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchSearchEvents = async (params: SearchEventsInput) => {
  try {
    const response = await axios.post("/api/SearchEvents", params);
    const data = response.data.SearchEventsResult?.Event;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchSearchPerformers = async (params: SearchPerformersInput) => {
  try {
    const response = await axios.post("/api/SearchPerformers", params);
    const data = response.data.SearchPerformersResult.Performer;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchGetEvents = async (params: GetEventsInput) => {
  try {
    const response = await axios.post("/api/GetEvents", params);
    const data = response.data.GetEventsResult?.Event;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchGetEventTickets3 = async (params: GetEventTickets3Input) => {
  try {
    const response = await axios.post("/api/GetEventTickets3", params);
    const data = response.data.GetEventTickets3Result.Tickets.TicketGroup3;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
