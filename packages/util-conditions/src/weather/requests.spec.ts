import axios from "axios";
import { CurrentWeather } from "@pescador-api/service-graph";
import { requestWeatherByZip } from "./requests";
import { openWeatherResponse } from "../__fixtures__";

jest.mock("axios");

jest.mock("../helpers/", () => ({
  ...jest.requireActual("../helpers"),
  getZipCoords: jest.fn().mockResolvedValue({ lat: 10.12345, lng: 10.12345 }),
}));

const axiosMocked = jest.mocked(axios);

describe("requestWeatherByZip", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls the OpenWeather API correctly and returns formatted data", async () => {
    const expectedResult: CurrentWeather = {
      __typename: "CurrentWeather",
      temp: 72.2,
      wind: {
        __typename: "WindData",
        speed: 5.6,
        direction: 210,
        gust: 10,
      },
      humidity: 80.2,
      pressure: 1050,
      clouds: "mostly cloudy",
    };

    axiosMocked.mockResolvedValueOnce({ data: openWeatherResponse });

    const result = await requestWeatherByZip("01118");

    expect(result).toEqual(expectedResult);
  });
});
