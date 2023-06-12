import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";
import cache from "memory-cache";

// Set cache expiration time in milliseconds (1 hour = 3600000 milliseconds)
const cacheDuration = 3600000 * 24;

type ResponseData = {
  message: string;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params = {
    websiteConfigID: WBCID,
  };

  try {
    const cachedData = cache.get("venues");
    if (cachedData) {
      // If data exists in cache, return it
      res.status(200).json(cachedData);
    } else {
      // Make the SOAP request
      const response = await client.GetVenueAsync(params);

      console.log(response, client);

      // Cache the fetched data
      cache.put("venues", response[0], cacheDuration);

      // Return the SOAP response as JSON
      res.status(200).json(response[0]);
    }
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
