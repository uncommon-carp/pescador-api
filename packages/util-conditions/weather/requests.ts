import axios from "axios";
import { getZipCoords } from "../helpers/getZipCoords";

const apiKey = process.env.OPEN_WEATHER_API_KEY;

export async function requestWeatherByZip(zip: number) {
  const result = await getZipCoords(zip);
  if (typeof result === "string") {
    console.log("Error", result);
    return result;
  }
  const { lat, lng } = result;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      console.log("Axios error", error.message);
    } else {
      console.log("Unexpected error", error.message);
    }
  }
}
