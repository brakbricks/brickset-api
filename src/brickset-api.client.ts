import { BricksetApiException } from "./brickset-api.exception";
import { BRICKLINK_API_BASEURL, ROUTES } from "./consts";
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
import {
  BricklinkApiRequestData,
  BricklinkApiResponse,
  BricklinkApiSuccessResponse,
  GetAdditionalImagesResponse,
  GetApiKeyUsageStatsResponse,
  GetInstructionsResponse,
  getMinifigCollectionParams,
  GetMinifigCollectionResponse,
  GetReviewsResponse,
  getSetParams,
  GetSetsResponse,
  GetSubthemesResponse,
  GetThemesResponse,
  GetUserMinifigNotesResponse,
  GetUserNotesResponse,
  GetYearsResponse,
  LoginResponse,
  setCollectionParams,
  setMinifigCollectionParams,
} from "./types";

export class BricksetApiClient {
  constructor(private readonly apiKey: string) {}

  /**
   * Check if API key is valid.
   */
  async checkKey(): Promise<boolean> {
    const result = await this.request(ROUTES.CHECK_KEY);
    return result.status === "success";
  }

  /**
   * Check if a userHash key is valid.
   */
  async checkUserHash(userHash: string): Promise<boolean> {
    const result = await this.request(ROUTES.CHECK_USER_HASH, { userHash });
    return result.status === "success";
  }

  /**
   * Get key usage stats for the last 30 days. Note that only calls to the getSets method count against key usage.
   */
  async getKeyUsageStats(): Promise<apiKeyUsage[]> {
    const result = await this.request<GetApiKeyUsageStatsResponse>(
      ROUTES.GET_KEY_USAGE_STATS
    );
    return result.apiKeyUsage;
  }

  /**
   * Log in as a user and retrieve a token that can be used in subsequent API calls.
   */
  async login(username: string, password: string): Promise<string> {
    const result = await this.request<LoginResponse>(ROUTES.LOGIN, {
      username,
      password,
    });
    return result.hash;
  }

  /**
   * Retrieve a list of sets, or more information about a particular one.
   * TODO: This endpoint is limited to 100 calls a day, use queue?
   * 
   * 
   */


  /**
   * 
   * @param params getSetParams
   * @param userHash 
   * @returns 
   */
  async getSets(params: getSetParams, userHash: string = ""): Promise<set[]> {
    const result = await this.request<GetSetsResponse>(ROUTES.GET_SETS, {
      params: {
        ...params,
        theme: Array.isArray(params.theme)
          ? params.theme.join(",")
          : params.theme,
        subtheme: Array.isArray(params.subtheme)
          ? params.subtheme.join(",")
          : params.subtheme,
        setNumber: Array.isArray(params.setNumber)
          ? params.setNumber.join(",")
          : params.setNumber,
        year: Array.isArray(params.year) ? params.year.join(",") : params.year,
        updatedSince: params.updatedSince?.toISOString().split("T")[0],
        owned: params.owned ? 1 : undefined,
        wanted: params.wanted ? 1 : undefined,
        pageSize: params.pageSize ? Math.min(params.pageSize, 999) : undefined,
        extendedData: params.extendedData ? 1 : undefined,
      },
      userHash,
    });
    return result.sets;
  }

  /**
   * Get a list of URLs of additional set images for the specified set.
   */
  async getAdditionalImages(setID: number): Promise<image[]> {
    const result = await this.request<GetAdditionalImagesResponse>(
      ROUTES.GET_ADDITIONAL_IMAGES,
      { setID }
    );
    return result.additionalImages;
  }

  /**
   * Get a list of instructions for the specified set.
   */
  async getInstructions(setID: number): Promise<instruction[]> {
    const result = await this.request<GetInstructionsResponse>(
      ROUTES.GET_INSTRUCTIONS,
      { setID }
    );
    return result.instructions;
  }

  /**
   * Get a list of instructions for the specified set without the need to look up the set ID first.
   */
  async getInstructionsBySetNumber(setNumber: string): Promise<instruction[]> {
    const result = await this.request<GetInstructionsResponse>(
      ROUTES.GET_INSTRUCTIONS_2,
      { setNumber }
    );
    return result.instructions;
  }

  /**
   * Get user reviews for the specified set.
   */
  async getReviews(setID: number): Promise<review[]> {
    const result = await this.request<GetReviewsResponse>(ROUTES.GET_REVIEWS, {
      setID,
    });
    return result.reviews;
  }

  /**
   * Get a list of themes, with the total number of sets in each.
   */
  async getThemes(): Promise<theme[]> {
    const result = await this.request<GetThemesResponse>(ROUTES.GET_THEMES);
    return result.themes;
  }

  /**
   * Get a list of subthemes for a given theme, with the total number of sets in each.
   */
  async getSubthemes(theme: string): Promise<subtheme[]> {
    const result = await this.request<GetSubthemesResponse>(
      ROUTES.GET_SUBTHEMES,
      {
        Theme: theme,
      }
    );
    return result.subthemes;
  }

  /**
   * Get a list of years for a given theme, with the total number of sets in each.
   */
  async getYears(theme: string = ''): Promise<year[]> {
    const result = await this.request<GetYearsResponse>(ROUTES.GET_YEARS, {
      Theme: theme,
    });
    return result.years;
  }

  /**
   * Set a user's collection details.
   */
  async setCollection(
    setID: number,
    params: setCollectionParams,
    userHash: string
  ): Promise<boolean> {
    const result = await this.request(ROUTES.SET_COLLECTION, {
      params: {
        ...params,
        own: params.own ? 1 : 0,
        want: params.want ? 1 : 0,
        qtyOwned: Math.min(Math.max(params.qtyOwned, 0), 999),
        notes:
          params.notes?.length > 1000
            ? params.notes.substring(0, 999)
            : params.notes,
        rating: params.rating
          ? Math.min(Math.max(params.qtyOwned, 1), 5)
          : undefined,
      },
      setID,
      userHash,
    });
    return result.status === "success";
  }

  /**
   * Get a list of minifigs owned/wanted by a user.
   */
  async getMinifigCollection(
    params: getMinifigCollectionParams,
    userHash: string
  ): Promise<minifigCollection[]> {
    const result = await this.request<GetMinifigCollectionResponse>(
      ROUTES.GET_MINIFIG_COLLECTION,
      {
        params: {
          ...params,
          owned: params.owned ? 1 : undefined,
          wanted: params.wanted ? 1 : undefined,
        },
        userHash,
      }
    );
    return result.minifigs;
  }

  /**
   * Add/change a user's 'loose' minifig collection.
   * Note: due to the way this method works pass either own/want/qtyowned OR notes
   */
  async setMinifigCollection(
    minifigNumber: string,
    params: setMinifigCollectionParams,
    userHash: string
  ): Promise<boolean> {
    const result = await this.request(ROUTES.SET_MINIFIG_COLLECTION, {
      params: {
        own: params.own ? 1 : 0,
        want: params.want ? 1 : 0,
        qtyOwned: Math.min(Math.max(params.qtyOwned, 0), 500),
        notes:
          params.notes && params.notes.length > 1000
            ? params.notes.substring(0, 999)
            : params.notes,
      },
      minifigNumber,
      userHash,
    });
    return result.status === "success";
  }

  /**
   * Get all of a user's set notes.
   */
  async getUserNotes(userHash: string): Promise<userNote[]> {
    const result = await this.request<GetUserNotesResponse>(
      ROUTES.GET_USER_NOTES,
      { userHash }
    );
    return result.userNotes;
  }

  /**
   * Get all of a user's minifigure notes.
   */
  async getUserMinifigNotes(userHash: string): Promise<userMinifigNote[]> {
    const result = await this.request<GetUserMinifigNotesResponse>(
      ROUTES.GET_USER_MINIFIG_NOTES,
      { userHash }
    );
    return result.userMinifigNotes;
  }

  private async request<T = {}>(
    url: string,
    data?: BricklinkApiRequestData
  ): Promise<BricklinkApiSuccessResponse<T>> {
    const response = (await fetch(BRICKLINK_API_BASEURL + url, 
    {
      method: "POST",
      body: Object.entries({ 
        ...data, 
        params: data?.params !== undefined ? JSON.stringify(data.params) : undefined,
        apiKey: this.apiKey
      })
        .filter(([key, value]) => value !== undefined)
        .map(
          ([key, value]) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(value as string | number | boolean)
        )
        .join("&"),
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
    }));

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json() as BricklinkApiResponse<T>;

    if (responseData.status === "error") {
      throw new BricksetApiException(responseData.message);
    }

    return responseData;
  }
}
