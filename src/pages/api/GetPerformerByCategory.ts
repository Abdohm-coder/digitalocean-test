import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";
import cache from "memory-cache";

const cacheDuration = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    parentCategoryID,
    childCategoryID,
    performerName,
    hasEvent,
    grandchildCategoryID,
  } = req.body;

  // Generate a cache key based on the request query parameters
  const cacheKey = `${parentCategoryID}-${childCategoryID}-${performerName}-${grandchildCategoryID}-performer-category`;

  // Check if data is cached
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // If data exists in cache, return it
    return res.status(200).json(cachedData);
  }

  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: WBCID,
  };

  if (parentCategoryID) params["parentCategoryID"] = parentCategoryID;
  if (childCategoryID) params["childCategoryID"] = childCategoryID;
  if (performerName) params["performerName"] = performerName;
  if (hasEvent) params["hasEvent"] = hasEvent;
  if (grandchildCategoryID)
    params["grandchildCategoryID"] = grandchildCategoryID;

  try {
    // Make the SOAP request
    const response = await client.GetPerformerByCategoryAsync(params);

    // Cache the fetched data
    cache.put(cacheKey, response[0], cacheDuration);

    // Return the SOAP response as JSON
    res.status(200).json(response[0]);
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
