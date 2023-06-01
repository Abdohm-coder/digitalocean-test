import {
  GetEventTickets3Input,
  GetEventsInput,
  GetPerfomersByCategoryInput,
} from "../types/input-calls-types";

export const SearchEvents = (searchTerms: string) =>
  `SearchEvents?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }&searchTerms=${searchTerms}&whereClause=""&orderByClause=""`;

export const GetCategories = () =>
  `GetCategories?websiteConfigID=${import.meta.env.VITE_APP_WEB_CONFIG_ID}`;

export const GetEvents = ({
  beginDate,
  childCategoryID,
  cityZip,
  endDate,
  eventDate,
  eventID,
  eventName,
  grandchildCategoryID,
  highPrice,
  lowPrice,
  modificationDate,
  nearZip,
  noPerformers,
  numberOfEvents,
  onlyMine,
  orderByClause,
  parentCategoryID,
  performerID,
  performerName,
  stateID,
  stateProvDesc,
  venueID,
  venueName,
  whereClause,
}: GetEventsInput) =>
  `GetEvents?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }&beginDate=${beginDate}&childCategoryID=${childCategoryID}&cityZip=${cityZip}&endDate=${endDate}&eventDate=${eventDate}&eventID=${eventID}&eventName=${eventName}&grandchildCategoryID=${grandchildCategoryID}&highPrice=${highPrice}&lowPrice=${lowPrice}&modificationDate=${modificationDate}&nearZip=${nearZip}&noPerformers=${noPerformers}&numberOfEvents=${numberOfEvents}&onlyMine=${onlyMine}&orderByClause=${orderByClause}&parentCategoryID=${parentCategoryID}&performerID=${performerID}&performerName=${performerName}&stateID=${stateID}&stateProvDesc=${stateProvDesc}&venueID=${venueID}&venueName=${venueName}&whereClause=${whereClause}`;

export const GetEventTickets3 = ({
  eventID,
  highPrice,
  lowPrice,
  numberOfRecords,
  orderByClause,
  requestedTixSplit,
  ticketGroupID,
  translationLanguageId,
  whereClause,
}: GetEventTickets3Input) =>
  `GetEventTickets3?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }&eventID=${eventID}&highPrice=${highPrice}&lowPrice=${lowPrice}&numberOfRecords=${numberOfRecords}&orderByClause=${orderByClause}&requestedTixSplit=${requestedTixSplit}&ticketGroupID=${ticketGroupID}&translationLanguageId=${translationLanguageId}&whereClause=${whereClause}`;

export const GetVenue = (VenueID?: string) =>
  `GetVenue?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }&VenueID=${VenueID}`;

export const GetEventPerformers = () =>
  `GetEventPerformers?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }`;

export const GetPerfomersByCategory = ({
  childCategoryID,
  grandchildCategoryID,
  hasEvent,
  parentCategoryID,
}: GetPerfomersByCategoryInput) =>
  `GetPerfomersByCategory?websiteConfigID=${
    import.meta.env.VITE_APP_WEB_CONFIG_ID
  }&childCategoryID=${childCategoryID}&grandchildCategoryID=${grandchildCategoryID}&hasEvent=${hasEvent}&parentCategoryID=${parentCategoryID}`;
