import {
  apiKeyUsage,
  BricksetImage,
  instruction,
  minifigCollection,
  orderBy,
  review,
  BricksetSet,
  subtheme,
  theme,
  userMinifigNote,
  userNote,
  year,
} from "./data.types";

interface LoginRequestData {
  username: string;
  password: string;
}

interface SetIDRequestData {
  setID: number;
}

interface SetNumberRequestData {
  setNumber: string;
}

interface ThemeRequestData {
  Theme: string;
}

interface UserHashRequestData {
  userHash: string;
}

interface SetCollectionParams {
  //1 or 0. If 0 then qtyOwned is automatically set to 0
  own: 1 | 0;
  want: 1 | 0;
  // 0-999. If > 0 then own is automatically set to 1
  qtyOwned: number;
  // User notes, max 1000 characters
  notes: string;
}

interface GetCollectionParams {
  // Set to 1 to retrieve owned
  owned?: 1;
  // Set to 1 to retrieve wanted
  wanted?: 1;
  /**  Search term: searches set number, name, theme and subtheme */
  query?: string;
}

type SetMinifigCollectionRequestData = UserHashRequestData & {
  minifigNumber: string;
  params: SetCollectionParams;
};
type GetMinifigCollectionRequestData = UserHashRequestData & {
  params: GetCollectionParams;
};
type SetCollectionRequestData = UserHashRequestData &
  SetIDRequestData & {
    params: SetCollectionParams & {
      // User rating 1-5
      rating: number;
    };
  };
type GetSetsRequestData = UserHashRequestData & {
  params: {
    //Internal SetID
    setID?: number;
    //  will accept a Decimal value or a comma delimited list.
    theme?: number | string;
    //  will accept a Decimal value or a comma delimited list.
    subtheme?: number | string;
    /**  Full set number, in the format {number}-{variant}, e.g. 6876-1 */
    setNumber?: string | string[];
    //  will accept a Decimal value or a comma delimited list.
    year?: number | string;
    tag?: string;
    /**  yyyy-mm-dd format */
    updatedSince?: string;
    /**
     *  Sort order
     * Valid values are Number, YearFrom, Pieces, Minifigs, Rating, [UK|US|CA|DERetailPrice], [UK|US|CA|DEPricePerPiece], Theme, Subtheme, Name, Random, QtyOwned, OwnCount, WantCount, UserRating, CollectionID (order record added to a user's collection), Rank (search ranking)
     * Add 'DESC' to the end of numerical field names to sort descending, e.g. PiecesDESC. Default: Number. Values are case-insensitive.
     */
    orderBy?: orderBy;
    /**  Specify how many records to retrieve (default: 20, max: 500) */
    pageSize?: number;
    // Specify which page of records to retrieve, use in conjunction with pageSize (default: 1)
    pageNumber?: number;
    /**  Set to 1 to retrieve the full data set, including tags, description and notes. */
    extendedData?: 1;
  } & GetCollectionParams;
};

export type BricklinkApiRequestData = { params?: unknown } & (
  | LoginRequestData
  | SetIDRequestData
  | SetNumberRequestData
  | ThemeRequestData
  | UserHashRequestData
  | GetSetsRequestData
  | SetCollectionRequestData
  | SetMinifigCollectionRequestData
  | GetMinifigCollectionRequestData
);

interface BricklinkApiErrorResponse {
  status: "error";
  message: string;
}
export type BricklinkApiSuccessResponse<T> = { status: "success" } & T;
export type BricklinkApiResponse<T> =
  | BricklinkApiSuccessResponse<T>
  | BricklinkApiErrorResponse;

type MatchesSubResponse<T> = { matches: number } & T;

export type GetApiKeyUsageStatsResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ apiKeyUsage: apiKeyUsage[] }>
>;
export type LoginResponse = BricklinkApiSuccessResponse<{ hash: string }>;
export type GetSetsResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ sets: BricksetSet[] }>
>;
export type GetAdditionalImagesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ additionalImages: BricksetImage[] }>
>;
export type GetInstructionsResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ instructions: instruction[] }>
>;
export type GetReviewsResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ reviews: review[] }>
>;
export type GetThemesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ themes: theme[] }>
>;
export type GetSubthemesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ subthemes: subtheme[] }>
>;
export type GetYearsResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ years: year[] }>
>;
export type GetMinifigCollectionResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ minifigs: minifigCollection[] }>
>;
export type GetUserNotesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ userNotes: userNote[] }>
>;
export type GetUserMinifigNotesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ userMinifigNotes: userMinifigNote[] }>
>;

export interface getSetParams {
  setID?: number;
  /**  Search term: searches set number, name, theme and subtheme */
  query?: string;
  theme?: string | string[];
  subtheme?: string | string[];
  /**  Full set number, in the format {number}-{variant}, e.g. 6876-1 */
  setNumber?: string | string[];
  year?: number | number[];
  tag?: string;
  owned?: true;
  wanted?: true;
  /**  yyyy-mm-dd format */
  updatedSince?: Date;
  orderBy?: orderBy;
  /**  default 20, max 500 */
  pageSize?: number;
  pageNumber?: number;
  /**  Set to 1 to retrieve the full data set, including tags, description and notes. */
  extendedData?: true;
}

export interface setCollectionParams {
  /**  1 or 0. If 0 then qtyOwned is automatically set to 0 */
  own: boolean;
  want: boolean;
  /**  0-999. If > 0 then own is automatically set to 1 */
  qtyOwned: number;
  /**  User notes, max 1000 characters */
  notes: string;
  /**  User rating 1-5 */
  rating?: number;
}

export interface getMinifigCollectionParams {
  owned?: true;
  wanted?: true;
  /** This can be a minifig number or name. Wildcards are added before and after. If omitted, all minifigs owned are returned. */
  query?: string;
}

export interface setMinifigCollectionParams {
  /**  1 or 0. If 0 then qtyOwned is automatically set to 0 */
  own: boolean;
  want: boolean;
  /**  0-999. If > 0 then own is automatically set to 1 */
  qtyOwned: number;
  /**  User notes, max 1000 characters */
  notes?: string;
}
