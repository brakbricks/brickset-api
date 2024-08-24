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

export interface BricksetSet {
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
  image: BricksetImage;
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
}

interface LEGOCom {
  US?: LEGOComDetails;
  UK?: LEGOComDetails;
  CA?: LEGOComDetails;
  DE?: LEGOComDetails;
}

interface LEGOComDetails {
  retailPrice?: number;
  dateFirstAvailable?: Date;
  dateLastAvailable?: Date;
}

interface dimensions {
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
}

interface extendedData {
  notes: string;
  tags: string[];
  description: string;
}

interface collection {
  owned?: boolean;
  wanted?: boolean;
  qtyOwned?: number;
  rating?: number;
  notes: string;
}

interface collections {
  ownedBy?: number;
  wantedBy?: number;
}

interface barcodes {
  EAN?: string;
  UPC?: string;
}

interface ageRange {
  min?: number;
  max?: number;
}

export interface BricksetImage {
  thumbnailURL: string;
  imageURL: string;
}

export interface rating {
  overall: number;
  parts: number;
  buildingExperience: number;
  playability: number;
  valueForMoney: number;
}

export interface review {
  author: string;
  datePosted: Date;
  rating: rating;
  title: string;
  review: string;
  HTML: boolean;
}

export interface minifigCollection {
  minifigNumber: string;
  name: string;
  category: string;
  ownedInSets: number;
  ownedLoose: number;
  ownedTotal: number;
  wanted: boolean;
}

export interface theme {
  theme: string;
  setCount: number;
  subthemeCount: number;
  yearFrom: number;
  yearTo: number;
}

export interface subtheme {
  theme: string;
  subtheme: string;
  setCount: number;
  yearFrom: number;
  yearTo: number;
}

export interface year {
  theme: string;
  year: string;
  setCount: number;
}

export interface instruction {
  URL: string;
  description: string;
}

export interface userNote {
  setID: number;
  notes: string;
}

export interface userMinifigNote {
  minifigNumber: string;
  notes: string;
}

export interface apiKeyUsage {
  dateStamp: Date;
  count: number;
}
