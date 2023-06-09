import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";
import cache from "memory-cache";

type ResponseData = {
  message: string;
};

// Set cache expiration time in milliseconds (1 hour = 3600000 milliseconds)
const cacheDuration = 3600000 * 24;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    parentCategoryID,
    childCategoryID,
    numReturned,
    grandchildCategoryID,
  } = req.body;

  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: WBCID,
  };

  if (parentCategoryID) params["parentCategoryID"] = parentCategoryID;
  if (childCategoryID) params["childCategoryID"] = childCategoryID;
  if (numReturned) params["numReturned"] = numReturned;
  if (grandchildCategoryID)
    params["grandchildCategoryID"] = grandchildCategoryID;

  try {
    // Check if data is cached
    const cachedData = cache.get(`high_sales-${parentCategoryID}`);
    if (cachedData) {
      // If data exists in cache, return it
      res.status(200).json(cachedData);
    } else {
      // Make the SOAP request
      const response = await client.GetHighSalesPerformersAsync(params);

      // Cache the fetched data
      cache.put(`high_sales-${parentCategoryID}`, response[0], cacheDuration);

      // Return the SOAP response as JSON
      res.status(200).json(response[0]);
    }
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
