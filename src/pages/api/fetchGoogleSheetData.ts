import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import key from "@/service-account.json";
import cache from "memory-cache";

const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { sheetId, sheetName, range } = req.query;

    // Generate a cache key based on the request query parameters
    const cacheKey = `${sheetId}-${sheetName}-${range}`;

    // Check if data is cached
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      // If data exists in cache, return it
      return res.status(200).json({ data: cachedData });
    }

    const client = new google.auth.JWT(
      key.client_email,
      undefined,
      key.private_key,
      "https://www.googleapis.com/auth/spreadsheets"
    );

    client.authorize(async function (err, _) {
      if (err) return res.status(400).send(JSON.stringify({ error: true }));
      const gsapi = google.sheets({ version: "v4", auth: client });
      const opt = {
        spreadsheetId: sheetId as string,
        range: `${sheetName}!${range}`,
      };

      let data = await gsapi.spreadsheets.values.get(opt);

      // Cache the fetched data
      cache.put(cacheKey, data.data.values, cacheDuration);
      return res.status(200).json({ data: data.data.values });
    });
  } catch (error: any) {
    console.error("Error fetching Google Sheet data:", error);
    return res.status(500).json({ error: true, message: error.message });
  }
}
