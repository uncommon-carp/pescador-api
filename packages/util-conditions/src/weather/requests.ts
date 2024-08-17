import axios from "axios";
import { getZipCoords } from "../helpers/getZipCoords";
import { InternalServerError } from "@pescador-api/util-errors";

const apiKey = process.env.OPEN_WEATHER_API_KEY;

export async function requestWeatherByZip(zip: string) {
  const result = await getZipCoords(zip);
  if (typeof result === "string") {
    return result;
  }
  console.log({ coordsResult: result });
  const { lat, lng } = result;
  const params = {
    lat,
    lon: lng,
    appid: apiKey,
    units: "imperial",
  };
  try {
    const response = await axios({
      method: "get",
      url: `https://api.openweathermap.org/data/3.0/onecall`,
      params,
    });
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      console.log("Axios error", error);
    } else {
      throw new InternalServerError("2fa2240f-bd2b-4695-8d5e-d572a73c2ab4");
    }
  }
}
