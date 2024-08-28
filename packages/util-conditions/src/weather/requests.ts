import axios from "axios";
import { getZipCoords } from "../helpers";
import { InternalServerError } from "@pescador-api/util-errors";
import { CurrentWeather } from "@pescador-api/service-graph";
import { OpenWeatherResponse } from "@pescador-api/interfaces-conditions";

const apiKey = process.env.OPEN_WEATHER_API_KEY;

export async function requestWeatherByZip(zip: string) {
  const { lat, lng } = await getZipCoords(zip);
  const params = {
    lat,
    lon: lng,
    appid: apiKey,
    units: "imperial",
  };
  try {
    const response = await axios<OpenWeatherResponse>({
      method: "get",
      url: `https://api.openweathermap.org/data/3.0/onecall`,
      params,
    });
    if (!response.data.current) {
      throw new InternalServerError("e66d4ca7-3eda-44a8-b7b2-b1a7839b70a9");
    }
    const weatherData: CurrentWeather = {
      __typename: "CurrentWeather",
      temp: response.data.current.temp,
      wind: {
        __typename: "WindData",
        speed: response.data.current.wind_speed,
        direction: response.data.current.wind_deg,
        gust: response.data.current.wind_gust,
      },
      pressure: response.data.current.pressure,
      humidity: response.data.current.humidity,
      clouds: "mostly cloudy",
    };
    return weatherData;
  } catch (error) {
    if (error.isAxiosError) {
      console.log("Axios error", error);
    } else {
      throw new InternalServerError("2fa2240f-bd2b-4695-8d5e-d572a73c2ab4");
    }
  }
}
