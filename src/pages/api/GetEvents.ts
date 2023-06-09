import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";
import cache from "memory-cache";

const cacheDuration = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    parentCategoryID,
    childCategoryID,
    performerName,
    performerID,
    numberOfEvents,
    orderByClause,
  } = req.body;

  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: WBCID,
  };

  if (parentCategoryID) params["parentCategoryID"] = parentCategoryID;
  if (childCategoryID) params["childCategoryID"] = childCategoryID;
  if (performerName) params["performerName"] = performerName;
  if (performerID) params["performerID"] = performerID;
  if (numberOfEvents) params["numberOfEvents"] = numberOfEvents;
  if (orderByClause) params["orderByClause"] = orderByClause;

  // Generate a cache key based on the request query parameters
  const cacheKey = `${parentCategoryID}-${childCategoryID}-${performerName}-${performerID}-${numberOfEvents}-${orderByClause}`;

  // Check if data is cached
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // If data exists in cache, return it
    return res.status(200).json(cachedData);
  }

  try {
    // Make the SOAP request
    const response = await client.GetEventsAsync(params);

    console.log(response, client);

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
