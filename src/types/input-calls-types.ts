export declare type GetEventsInput = {
  numberOfEvents?: number;
  eventID?: number;
  eventName?: string;
  eventDate?: string;
  beginDate?: string;
  endDate?: string;
  venueID?: number;
  venueName?: string;
  stateProvDesc?: string;
  stateID?: number;
  cityZip?: string;
  nearZip?: string;
  parentCategoryID?: number;
  childCategoryID?: number;
  grandchildCategoryID?: number;
  performerID?: number;
  performerName?: string;
  noPerformers?: boolean;
  lowPrice?: number;
  highPrice?: number;
  modificationDate?: string;
  onlyMine?: boolean;
  whereClause?: string;
  orderByClause?: string;
};

export declare type GetEventTickets3Input = {
  eventID?: number;
  numberOfRecords?: number;
  lowPrice?: number;
  highPrice?: number;
  ticketGroupID?: number;
  requestedTixSplit?: number;
  whereClause?: string;
  orderByClause?: string;
  translationLanguageId?: number;
};

export declare type GetPerformerByCategoryInput = {
  parentCategoryID?: number;
  childCategoryID?: number;
  grandchildCategoryID?: number;
  hasEvent?: boolean;
};

export declare type GetHighSalesPerformersInput = {
  parentCategoryID?: number;
  childCategoryID?: number;
  grandchildCategoryID?: number;
  numReturned?: number;
};

export declare type GetHighInventoryPerformersInput = {
  parentCategoryID?: number;
  childCategoryID?: number;
  grandchildCategoryID?: number;
  numReturned?: number;
};

export declare type SearchEventsInput = {
  searchTerms?: string;
  whereClause?: string;
  orderByClause?: string;
};

export declare type SearchPerformersInput = {
  searchTerms?: string;
  whereClause?: string;
  orderByClause?: string;
};
