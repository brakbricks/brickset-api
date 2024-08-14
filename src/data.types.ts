//TODO: fix retail price orderBy options, add desc options
// Add 'DESC' to the end of numerical field names to sort descending, e.g. PiecesDESC. Default: Number. Values are case-insensitive.
export type orderBy =
  | "Number"
  | "YearFrom"
  | "Pieces"
  | "Minifigs"
  | "Rating"
  | "[UK|US|CA|DERetailPrice]"
  | "[UK|US|CA|DEPricePerPiece]"
  | "Theme"
  | "Subtheme"
  | "Name"
  | "Random"
  | "QtyOwned"
  | "OwnCount"
  | "WantCount"
  | "UserRating"
  | "CollectionID"
  | "Rank";

export type set = {
  setID: number;
  number: string;
  numberVariant: number;
  name: string;
  year: number;
  theme: string;
  themeGroup: string;
  subtheme: string;
  category: string;
  released: boolean;
  pieces?: number;
  minifigs?: number;
  image: image;
  bricksetURL: string;
  collection: collection;
  collections: collections;
  LEGOCom: LEGOCom;
  rating: number;
  reviewCount: number;
  packagingType: string;
  availability: string;
  instructionsCount: number;
  additionalImageCount: number;
  ageRange: ageRange;
  dimensions: dimensions;
  barcode: barcodes;
  extendedData?: extendedData;
  lastUpdated: Date;
};

export type LEGOCom = {
  US: LEGOComDetails;
  UK: LEGOComDetails;
  CA: LEGOComDetails;
  DE: LEGOComDetails;
};

export type LEGOComDetails = {
  retailPrice?: number;
  dateFirstAvailable?: Date;
  dateLastAvailable?: Date;
};

export type dimensions = {
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
};

export type extendedData = {
  notes: string;
  tags: string[];
  description: string;
};

export type collection = {
  owned?: boolean;
  wanted?: boolean;
  qtyOwned?: number;
  rating?: number;
  notes: string;
};

export type collections = {
  ownedBy?: number;
  wantedBy?: number;
};

export type barcodes = {
  EAN?: string;
  UPC?: string;
};

export type ageRange = {
  min?: number;
  max?: number;
};

export type image = {
  thumbnailURL: string;
  imageURL: string;
};

export type rating = {
  overall: number;
  parts: number;
  buildingExperience: number;
  playability: number;
  valueForMoney: number;
};

export type review = {
  author: string;
  datePosted: Date;
  rating: rating;
  title: string;
  review: string;
  HTML: boolean;
};

export type minifigCollection = {
  minifigNumber: string;
  name: string;
  category: string;
  ownedInSets: number;
  ownedLoose: number;
  ownedTotal: number;
  wanted: boolean;
};

export type theme = {
  theme: string;
  setCount: number;
  subthemeCount: number;
  yearFrom: number;
  yearTo: number;
};

export type subtheme = {
  theme: string;
  subtheme: string;
  setCount: number;
  yearFrom: number;
  yearTo: number;
};

export type year = {
  theme: string;
  year: string;
  setCount: number;
};

export type instruction = {
  URL: string;
  description: string;
};

export type userNote = {
  setID: number;
  notes: string;
};

export type userMinifigNote = {
  minifigNumber: string;
  notes: string;
};

export type apiKeyUsage = { dateStamp: Date; count: number };
