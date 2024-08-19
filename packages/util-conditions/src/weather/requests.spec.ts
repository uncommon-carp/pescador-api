import axios from "axios";
import { requestWeatherByZip } from "./requests";
import { openWeatherResponse } from "../__fixtures__/openWeatherMock";
import { getZipCoords } from "../helpers";
import { CurrentWeather } from "@pescador-api/service-graph";

jest.mock("axios");
jest.mock("../helpers");

const axiosMocked = jest.mocked(axios);
const getZipCoordsMocked = jest.mocked(getZipCoords);

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
      clouds: "Mostly cloudy",
    };
    getZipCoordsMocked.mockResolvedValueOnce({ lat: 10.12345, lng: 10.12345 });
    axiosMocked.mockResolvedValueOnce(openWeatherResponse);

    const result = await requestWeatherByZip("12345");

    expect(result).toEqual(expectedResult);
  });
});
