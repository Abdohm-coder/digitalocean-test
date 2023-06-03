import { SOAP_ACTION, WBCID } from "@/settings/site.settings";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClientAsync } from "soap";

type ResponseData = {
  message: string;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // const {
  //   parentCategoryID,
  //   childCategoryID,
  //   performerName,
  //   performerID,
  //   numberOfEvents,
  //   orderByClause,
  // } = req.body;

  // Create a new SoapClient instance
  const client = await createClientAsync(SOAP_ACTION);

  // Define the SOAP request parameters
  const params: any = {
    websiteConfigID: WBCID,
  };

  // if (parentCategoryID) params["parentCategoryID"] = parentCategoryID;
  // if (childCategoryID) params["childCategoryID"] = childCategoryID;
  // if (performerName) params["performerName"] = performerName;
  // if (performerID) params["performerID"] = performerID;
  // if (numberOfEvents) params["numberOfEvents"] = numberOfEvents;
  // if (orderByClause) params["orderByClause"] = orderByClause;

  try {
    // Make the SOAP request
    const response = await client.GetEventsAsync(params);

    // Return the SOAP response as JSON
    res.status(200).json(response);
  } catch (error) {
    console.error("SOAP request error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
}
