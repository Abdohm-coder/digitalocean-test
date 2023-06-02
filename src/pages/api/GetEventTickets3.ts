import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    eventID,
    numberOfRecords,
    lowPrice,
    highPrice,
    ticketGroupID,
    requestedTixSplit,
    orderByClause,
    whereByClause,
  } = req.body;

  // Create a new SoapClient instance
  const client = await createClientAsync(
    "http://tnwebservices-test.ticketnetwork.com/TNWebservice/v3.2/TNWebservice.asmx?wsdl"
  );

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: 4626,
  };

  if (eventID) params["eventID"] = eventID;
  if (numberOfRecords) params["numberOfRecords"] = numberOfRecords;
  if (lowPrice) params["lowPrice"] = lowPrice;
  if (highPrice) params["highPrice"] = highPrice;
  if (ticketGroupID) params["ticketGroupID"] = ticketGroupID;
  if (requestedTixSplit) params["requestedTixSplit"] = requestedTixSplit;
  if (orderByClause) params["orderByClause"] = orderByClause;
  if (whereByClause) params["whereByClause"] = whereByClause;

  try {
    // Make the SOAP request
    const response = await client.GetEventTickets3Async(params);

    // Return the SOAP response as JSON
    res.status(200).json(response[0]);
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
