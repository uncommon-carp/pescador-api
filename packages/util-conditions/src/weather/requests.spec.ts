import axios from "axios";
import { requestWeatherByZip } from "./requests";

jest.mock("axios");

const axiosMocked = jest.mocked(axios);

describe("requestWeatherByZip", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls the OpenWeather API correctly and returns formatted data", async () => {
    axiosMocked.mockResolvedValueOnce({});
  });
});
