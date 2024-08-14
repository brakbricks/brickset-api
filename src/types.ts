import {
  apiKeyUsage,
  image,
  instruction,
  minifigCollection,
  orderBy,
  review,
  set,
  subtheme,
  theme,
  userMinifigNote,
  userNote,
  year,
} from "./data.types";

type LoginRequestData = {
  username: string;
  password: string;
};

type SetIDRequestData = {
  setID: number;
};

type SetNumberRequestData = {
  setNumber: string;
};

type ThemeRequestData = {
  Theme: string;
};

type UserHashRequestData = {
  userHash: string;
};

type SetCollectionParams = {
    //1 or 0. If 0 then qtyOwned is automatically set to 0
    own: 1 | 0;
    want: 1 | 0;
    // 0-999. If > 0 then own is automatically set to 1
    qtyOwned: number;
    // User notes, max 1000 characters
    notes: string;
}

type GetCollectionParams = {
    // Set to 1 to retrieve owned
    owned?: 1;
    // Set to 1 to retrieve wanted
    wanted?: 1;
    /** @var Search term: searches set number, name, theme and subtheme */
    query?: string;
}

type SetMinifigCollectionRequestData = UserHashRequestData & { minifigNumber: string, params: SetCollectionParams };
type GetMinifigCollectionRequestData = UserHashRequestData & { params: GetCollectionParams };
type SetCollectionRequestData = UserHashRequestData & SetIDRequestData & { params: SetCollectionParams & {
    // User rating 1-5
    rating: number;
}};
type GetSetsRequestData = UserHashRequestData & { params: {
    //Internal SetID
    setID?: number;
    // @var will accept a Decimal value or a comma delimited list.
    theme?: number | string;
    // @var will accept a Decimal value or a comma delimited list.
    subtheme?: number | string;
    /** @var Full set number, in the format {number}-{variant}, e.g. 6876-1 */
    setNumber?: string | string[];
    // @var will accept a Decimal value or a comma delimited list.
    year?: number | string;
    tag?: string;
    /** @var yyyy-mm-dd format */
    updatedSince?: string;
    /**
     * @var Sort order
     * Valid values are Number, YearFrom, Pieces, Minifigs, Rating, [UK|US|CA|DERetailPrice], [UK|US|CA|DEPricePerPiece], Theme, Subtheme, Name, Random, QtyOwned, OwnCount, WantCount, UserRating, CollectionID (order record added to a user's collection), Rank (search ranking)
     * Add 'DESC' to the end of numerical field names to sort descending, e.g. PiecesDESC. Default: Number. Values are case-insensitive.
     */
    orderBy?: orderBy;
    /** @var Specify how many records to retrieve (default: 20, max: 500) */
    pageSize?: number;
    //@var Specify which page of records to retrieve, use in conjunction with pageSize (default: 1)
    pageNumber?: number;
    /** @var Set to 1 to retrieve the full data set, including tags, description and notes. */
    extendedData?: 1;
} & GetCollectionParams };

export type BricklinkApiRequestData = { params?: any } & (LoginRequestData
  | SetIDRequestData
  | SetNumberRequestData
  | ThemeRequestData
  | UserHashRequestData
  | GetSetsRequestData
  | SetCollectionRequestData
  | SetMinifigCollectionRequestData
  | GetMinifigCollectionRequestData);

type BricklinkApiErrorResponse = { status: "error"; message: string };
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
  MatchesSubResponse<{ sets: set[] }>
>;
export type GetAdditionalImagesResponse = BricklinkApiSuccessResponse<
  MatchesSubResponse<{ additionalImages: image[] }>
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
