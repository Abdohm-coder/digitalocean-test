export declare type GetEventsProps = {
  ID: number;
  Name: string;
  City: string;
  Date: Date;
  DisplayDate: string;
  IsWomensEvent: boolean;
  MapURL: string;
  Venue: string;
  InteractiveMapURL: string;
  StateProvince: string;
  StateProvinceID: number;
  ChildCategoryID: number;
  GrandchildCategoryID: number;
  ParentCategoryID: number;
  VenueConfigurationID: number;
  VenueID: number;
  CountryID: number;
  Clicks: number;
};

export declare type SearchEventsProps = {
  ID: number;
  Name: string;
  City: string;
  Date: Date;
  DisplayDate: string;
  IsWomensEvent: boolean;
  MapURL: string;
  Venue: string;
  InteractiveMapURL: string;
  StateProvince: string;
  StateProvinceID: number;
  ChildCategoryID: number;
  GrandchildCategoryID: number;
  ParentCategoryID: number;
  VenueConfigurationID: number;
  VenueID: number;
  CountryID: number;
  Clicks: number;
};

export declare type GetTicketsProps = {
  ID: number;
  EventID: number;
  FacePrice: number;
  HighSeat: string;
  IsMine: boolean;
  Marked: boolean;
  LowSeat: string;
  Notes: string;
  ParentCategoryID: number;
  Rating: number;
  RatingDescription: string;
  Row: string;
  RetailPrice: number;
  TicketQuantity: number;
  ValidSplits: number[];
  TicketGroupType: string;
  currencyTypeAbbr: string;
  convertedActualPrice: number;
  isMercury: boolean;
  ActualPrice: number;
  Section: string;
  WholesalePrice: number;
};

export declare type GetEventTickets3Props = {
  ID: number;
  EventID: number;
  FacePrice: number;
  HighSeat: string;
  IsMine: boolean;
  Marked: boolean;
  LowSeat: string;
  Notes: string;
  ParentCategoryID: number;
  Rating: number;
  RatingDescription: string;
  Row: string;
  RetailPrice: number;
  TicketQuantity: number;
  ValidSplits: number[];
  TicketGroupType: string;
  CurrencyTypeAbbr: string;
  ConvertedActualPrice: number;
  isMercury: boolean;
  DeliveryOptions: string;
  ActualPrice: number;
  Section: string;
  WholesalePrice: number;
  PreDiscountPrice: number | null;
  EventNotes: string[];
};

export declare type GetEventPerformersProps = {
  EventID: number;
  PerformerID: number;
  PerformerName: string;
};

export declare type GetVenueProps = {
  BoxOfficePhone?: number;
  Capacity: number;
  ChildRules: string;
  City: string;
  Country: string;
  Directions: string;
  ID: number;
  Name: string;
  Notes: string;
  NumberOfConfigurations: number;
  Parking: string;
  PublicTransportation: string;
  Rules: string;
  StateProvince: string;
  Street_1: string;
  Street_2: string;
  URL: string;
  ZipCode: string;
  WillCall: boolean;
};

export declare type GetCategoriesProps = {
  ChildCategoryID: number;
  GrandchildCategoryID: number;
  ParentCategoryID: number;
  ChildCategoryDescription: string;
  GrandchildCategoryDescription: string;
  ParentCategoryDescription: string;
};

export declare type GetCountriesProps = {
  Abbreviation: string;
  ID: number;
  InternationalPhoneCode: number;
  Name: string;
  CurrencyTypeDesc: string;
  CurrencyTypeAbbr: string;
  ConversionToUSD: number;
  ConversionFromUSD: number;
};

export declare type GetCountryByIDProps = {
  ID: number;
  InternationalPhoneCode: number;
  Name: string;
  CurrencyTypeDesc: string;
  CurrencyTypeAbbr: string;
  ConversionToUSD: number;
  ConversionFromUSD: number;
};

export declare type GetHighInventoryPerformersProps = {
  ID: number;
  Description: string;
  Category: any;
  Percent: number;
};

export declare type GetHighSalesPerformersProps = {
  ID: number;
  Description: string;
  Category: any;
  Percent: number;
};

export declare type GetPerfomerByCategoryProps = {
  ID: number;
  HomeVenueID: number;
  Description: string;
  Category: GetCategoriesProps;
};

export declare type GetPricingInfoProps = {
  ticketsAvailable: number;
  highPrice: number;
  lowPrice: number;
  weightedAvgPrice: number;
  eventName: string;
};

export declare type SearchPerformersProps = {
  ID: number;
  HomeVenueID: number;
  ChildCategoryID: number;
  ParentCategoryID: number;
  GrandchildCategoryID: number;
  Description: string;
};