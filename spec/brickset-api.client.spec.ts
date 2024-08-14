import {
  describe,
  it,
  expect,
  test,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { BricksetApiClient } from "../src/brickset-api.client";

describe(BricksetApiClient, () => {
  const client = new BricksetApiClient("apistring");

  const spy = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ status: "success" }),
  } as Response);

  beforeEach(() => {
    spy.mockClear();
  });

  let endpoints = [
    [client.checkKey],
    [client.checkUserHash],
    [client.getAdditionalImages],
    [client.getInstructions],
    [client.getInstructionsBySetNumber],
    [client.getKeyUsageStats],
    [client.getMinifigCollection],
    [client.getReviews],
    [client.getSets],
    [client.getSubthemes],
    [client.getThemes],
    [client.getUserMinifigNotes],
    [client.getUserNotes],
    [client.getYears],
    [client.login],
    [client.setCollection],
    [client.setMinifigCollection],
  ];

  it("is defined", () => {
    expect(client).toBeDefined();
  });

  describe("checkKey", () => {
    it("calls the right endpoint", () => {
      client.checkKey();
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/checkKey",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "apiKey=apistring",
        })
      );
    });
  });

  describe("getKeyUsageStats", () => {
    it("calls the right endpoint", () => {
      client.getKeyUsageStats();
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getKeyUsageStats",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "apiKey=apistring",
        })
      );
    });
  });

  describe("login", () => {
    it("calls the right endpoint", () => {
      client.login("username", "password");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/login",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "username=username&password=password&apiKey=apistring",
        })
      );
    });
  });

  describe("checkUserHash", () => {
    it("calls the right endpoint", () => {
      client.checkUserHash("hash");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/checkUserHash",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "userHash=hash&apiKey=apistring",
        })
      );
    });
  });

  describe("getAdditionalImages", () => {
    it("calls the right endpoint", () => {
      client.getAdditionalImages(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getAdditionalImages",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "setID=1&apiKey=apistring"
        })
      );
    });
  });

  describe("getInstructions", () => {
    it("calls the right endpoint", () => {
      client.getInstructions(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getInstructions",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "setID=1&apiKey=apistring"
        })
      );
    });
  });

  describe("getInstructionsBySetNumber", () => {
    it("calls the right endpoint", () => {
      client.getInstructionsBySetNumber("1234");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getInstructions2",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "setNumber=1234&apiKey=apistring"
        })
      );
    });
  });

  describe("getMinifigCollection", () => {
    it("calls the right endpoint", () => {
      client.getMinifigCollection({}, "hash");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getMinifigCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "params=%7B%7D&userHash=hash&apiKey=apistring",
        })
      );
    });
    it("gets wanted and owned", () => {
      client.getMinifigCollection({ wanted: true, owned: true }, "hash");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getMinifigCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "params=%7B%22wanted%22%3A1%2C%22owned%22%3A1%7D&userHash=hash&apiKey=apistring"
        })
      );
    });
  });

  describe("getReviews", () => {
    it("calls the right endpoint", () => {
      client.getReviews(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getReviews",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "setID=1&apiKey=apistring"
        })
      );
    });
  });

  describe("getSets", () => {
    it("calls the right endpoint", () => {
      client.getSets({
        extendedData: true,
        owned: true,
        wanted: true,
      });
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getSets",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "params=%7B%22extendedData%22%3A1%2C%22owned%22%3A1%2C%22wanted%22%3A1%7D&userHash=&apiKey=apistring"
        })
      );
    });

    it("handles array params", () => {
      client.getSets({
        theme: ["test", "twee"],
        subtheme: ["test", "twee"],
        setNumber: ["test", "twee"],
        year: [1, 2],
      });
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getSets",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "params=%7B%22theme%22%3A%22test%2Ctwee%22%2C%22subtheme%22%3A%22test%2Ctwee%22%2C%22setNumber%22%3A%22test%2Ctwee%22%2C%22year%22%3A%221%2C2%22%7D&userHash=&apiKey=apistring"
        })
      );
    });

    it("limits pagesize to 999", () => {
      client.getSets({
        pageSize: 1500,
      });
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getSets",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: "params=%7B%22pageSize%22%3A999%7D&userHash=&apiKey=apistring"
        })
      );
    });
  });

  describe("getSubthemes", () => {
    it("calls the right endpoint", () => {
      client.getSubthemes("theme");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getSubthemes",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("getThemes", () => {
    it("calls the right endpoint", () => {
      client.getThemes();
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getThemes",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("getUserMinifigNotes", () => {
    it("calls the right endpoint", () => {
      client.getUserMinifigNotes("hash");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getUserMinifigNotes",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("getUserNotes", () => {
    it("calls the right endpoint", () => {
      client.getUserNotes("hash");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getUserNotes",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("getYears", () => {
    it("calls the right endpoint", () => {
      client.getYears();
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getYears",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });

    it("gets years for theme", () => {
      client.getYears("theme");
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/getYears",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("setCollection", () => {
    it("calls the right endpoint", () => {
      client.setCollection(
        1,
        {
          own: true,
          want: false,
          /** @var 0-999. If > 0 then own is automatically set to 1 */
          qtyOwned: 10,
          /** @var User notes, max 1000 characters */
          notes: "test",
          /** @var User rating 1-5 */
          rating: 3,
        },
        "hash"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/setCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });

    it("cuts notes over 1000 chars", () => {
      client.setCollection(
        1,
        {
          own: false,
          want: true,
          /** @var 0-999. If > 0 then own is automatically set to 1 */
          qtyOwned: 10,
          /** @var User notes, max 1000 characters */
          notes: "t".repeat(1500),
        },
        "hash"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/setCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  describe("setMinifigCollection", () => {
    it("calls the right endpoint", () => {
      client.setMinifigCollection(
        "theme",
        {
          own: true,
          want: false,
          /** @var 0-999. If > 0 then own is automatically set to 1 */
          qtyOwned: 10,
          /** @var User notes, max 1000 characters */
          notes: "text",
        },
        "hash"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/setMinifigCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });

    it("sets own to 0", () => {
      client.setMinifigCollection(
        "theme",
        {
          own: false,
          want: true,
          /** @var 0-999. If > 0 then own is automatically set to 1 */
          qtyOwned: 0,
          /** @var User notes, max 1000 characters */
          notes: "text",
        },
        "hash"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/setMinifigCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });

    it("cuts notes over 1000 chars", () => {
      client.setMinifigCollection(
        "theme",
        {
          own: false,
          want: true,
          /** @var 0-999. If > 0 then own is automatically set to 1 */
          qtyOwned: 0,
          /** @var User notes, max 1000 characters */
          notes: "t".repeat(1500),
        },
        "hash"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://brickset.com/api/v3.asmx/setMinifigCollection",
        expect.objectContaining({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
      );
    });
  });

  it("throws fetch error", async () => {
    spy.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ status: "error", message: "error" }),
    } as Response);

    expect(client.checkKey()).rejects.toThrowError("Response status: 401");
  });

  it("throws response status error", async () => {
    spy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: "error", message: "error" }),
    } as Response);

    expect(client.checkKey()).rejects.toThrowError("error");
  });
});
