// pages/api/fetchGoogleSheetData.ts

import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import key from "@/service-account.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { sheetId, sheetName, range } = req.query;

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
      return res.status(200).json({ data: data.data.values });
    });
  } catch (error: any) {
    console.error("Error fetching Google Sheet data:", error);
    return res.status(500).json({ error: true, message: error.message });
  }
}
