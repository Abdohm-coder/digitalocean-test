import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: "53.1,-0.13" },
  headers: {
    "X-RapidAPI-Key": "d1f528aa6amshd72a9753d166747p1ef544jsnf08383f892e5",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await axios.request(options);
    const data = response.data;
    console.log(data);
    // @ts-ignore
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error: ", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
