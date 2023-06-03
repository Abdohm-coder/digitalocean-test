import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { searchTerms, whereClause, orderByClause } = req.body;

  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: WBCID,
  };
  if (searchTerms) params["searchTerms"] = searchTerms;
  if (whereClause) params["whereClause"] = whereClause;
  if (orderByClause) params["orderByClause"] = orderByClause;

  try {
    // Make the SOAP request
    const response = await client.SearchPerformersAsync(params);

    // Return the SOAP response as JSON
    res.status(200).json(response[0]);
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
