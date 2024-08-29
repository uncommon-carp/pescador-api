import { requestWeatherByZip } from "@pescador/util-conditions";

export async function getWeatherResolver(
  _parent: any,
  input: { zip: string },
  _context: any,
) {
  const result = await requestWeatherByZip(input.zip);
  const weatherData = {
    temp: result.current.temp,
    wind: {
      speed: result.current.wind_speed,
      direction: result.current.wind_deg,
      gust: result.current.wind_gust,
    },
    pressure: result.current.pressure,
    humidity: result.current.humidity,
    clouds: "mostly cloudy",
  };
  return weatherData;
}
