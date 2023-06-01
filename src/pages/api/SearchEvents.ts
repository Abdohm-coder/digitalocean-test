import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body;
  const searchTerms = body.searchTerms || "",
    whereClause = body.whereClause || "",
    orderByClause = body.orderByClause || "";

  // Create a new SoapClient instance
  const client = await createClientAsync(
    "http://tnwebservices-test.ticketnetwork.com/TNWebservice/v3.2/TNWebservice.asmx?wsdl"
  );

  // Define the SOAP request parameters
  const params = {
    websiteConfigID: 4626,
    searchTerms,
    whereClause,
    orderByClause,
  };

  try {
    // Make the SOAP request
    const response = await client.SearchEventsAsync(params);

    // Return the SOAP response as JSON
    res.status(200).json(response[0]);
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
