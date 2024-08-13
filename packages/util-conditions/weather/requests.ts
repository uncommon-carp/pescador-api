import axios from "axios";
import { getZipCoords } from "../helpers/getZipCoords";

export async function requestWeatherByZip(zip: number) {
  const result = await getZipCoords(zip);
  const { lat, lng } = result;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=30.26666&lon=-97.73330&appid=0a9d88d5d35c252b326e11f82a2b356f`,
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
