import { OpenWeatherResponse } from "@pescador-api/interfaces-conditions";

const date = new Date();

export const openWeatherResponse: OpenWeatherResponse = {
  lat: 30.12345,
  lon: -97.12345,
  current: {
    sunrise: Math.floor(date.getTime() / 1000),
    sunset: Math.floor(date.getTime() / 1000),
    temp: 72.2,
    pressure: 1050,
    humidity: 80.2,
    clouds: 10,
    wind_speed: 5.6,
    wind_deg: 210,
    wind_gust: 10,
    weather: [
      {
        id: 18,
        main: "cloudy",
        description: "Mostly cloudy",
        icon: "i0d",
      },
    ],
  },
};
