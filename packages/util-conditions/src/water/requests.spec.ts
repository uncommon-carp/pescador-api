import axios from "axios";
import { requestStationById, requestStationsByBounding } from "./requests";
import { InternalServerError } from "@pescador-api/util-errors";
import { usgsSingleSiteMock } from "../__fixtures__";
import { StationWithRange } from "../../../service-graph";

jest.mock("axios");
jest.mock("../helpers/", () => ({
  ...jest.requireActual("../helpers"),
  getZipCoords: jest.fn().mockResolvedValue({ lat: 10.12345, lng: 10.12345 }),
}));
const axiosMocked = jest.mocked(axios);

describe("requestStationById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error when the request to USGS fails", async () => {
    axiosMocked.mockRejectedValueOnce(new Error());

    await expect(requestStationById({ id: "12345", range: 1 })).rejects.toThrow(
      InternalServerError,
    );
  });

  it("makes a request to USGS with the correct parameters", async () => {
    const id = "12345";
    const range = 2;

    const expectedResult: StationWithRange = {
      __typename: "StationWithRange",
      name: "Station Name",
      usgsId: id,
      lat: "34.1234",
      lon: "-118.1234",
      values: {
        __typename: "ReportedValues",
        flow: [
          {
            __typename: "DataFrame",
            value: 15.7,
            timestamp: expect.any(String),
          },
        ],
        gageHt: [],
      },
    };

    axiosMocked.mockResolvedValueOnce({ data: usgsSingleSiteMock });

    const result = await requestStationById({ id: "12345", range });

    expect(axiosMocked).toHaveBeenCalledWith({
      method: "get",
      url: "http://waterservices.usgs.gov/nwis/iv",
      params: {
        format: "JSON",
        sites: id,
        siteStatus: "active",
        period: `P${range}D`,
      },
    });
    expect(result).toEqual(expectedResult);
  });
});

describe("requestStationsByBounding", () => {
  it("throws an error when the request to USGS fails", async () => {
    axiosMocked.mockRejectedValueOnce(new Error());

    await expect(requestStationsByBounding({ zip: "12345" })).rejects.toThrow(
      InternalServerError,
    );
  });
});
