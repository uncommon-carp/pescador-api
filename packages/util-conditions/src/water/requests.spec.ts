import axios from "axios";
import { requestStationById, requestStationsByBounding } from "./requests";
import { InternalServerError } from "@pescador-api/util-errors";
import { usgsMultipleMock, usgsSingleSiteMock } from "../__fixtures__";
import { StationWithRange, BulkStation } from "@pescador-api/service-graph";

jest.mock("axios");
jest.mock("../helpers/", () => ({
  ...jest.requireActual("../helpers"),
  getZipCoords: jest.fn().mockResolvedValue({ lat: 10.12345, lng: 10.12345 }),
}));
const axiosMocked = jest.mocked(axios);

describe("requestStationById", () => {
  afterEach(() => {
    console.log("clearing mocks");
    jest.clearAllMocks();
  });

  it("calls the USGS API correctly and returns formatted data", async () => {
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

    expect(axiosMocked).toHaveBeenCalledTimes(1);
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

  it("throws an error when the request to USGS fails", async () => {
    axiosMocked.mockRejectedValueOnce(new Error());

    await expect(requestStationById({ id: "12345", range: 1 })).rejects.toThrow(
      InternalServerError,
    );
  });
});

describe("requestStationsByBounding", () => {
  it("calls the USGS API correctly and returns formatted data", async () => {
    const expectedResult: BulkStation = {
      __typename: "BulkStation",
      streams: [
        {
          __typename: "SingleStation",
          name: "River Station",
          usgsId: "12345",
          lat: "34.1234",
          lon: "-118.1234",
          flowRate: 15.7,
        },
      ],
      lakes: [
        {
          __typename: "SingleStation",
          name: "Lake Station",
          usgsId: "67890",
          lat: "34.1234",
          lon: "-118.1234",
          gageHt: 15.7,
        },
      ],
    };
    axiosMocked.mockResolvedValueOnce({ data: usgsMultipleMock });

    const result = await requestStationsByBounding({ zip: "12345" });
    expect(axiosMocked).toHaveBeenCalledTimes(1);
    expect(axiosMocked).toHaveBeenCalledWith({
      method: "get",
      url: "http://waterservices.usgs.gov/nwis/iv",
      params: {
        format: "JSON",
        siteStatus: "active",
        bBox: "9.92345,9.92345,10.32345,10.32345",
        siteType: "LK,ST",
        parameterCd: "00060,00065",
      },
    });
    expect(result).toEqual(expectedResult);
  });

  it("throws an error when the request to USGS fails", async () => {
    axiosMocked.mockRejectedValueOnce(new Error());

    await expect(requestStationsByBounding({ zip: "12345" })).rejects.toThrow(
      InternalServerError,
    );
  });
});
