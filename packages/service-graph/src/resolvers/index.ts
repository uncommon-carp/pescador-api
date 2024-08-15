import { getStationResolver } from "./station";
import { getWeatherResolver } from "./weather";

export function getResolvers() {
  const resolvers = {
    Query: {
      hello: () => "world",
      user: () => ({ email: "test@test.com", zipCode: 11111 }),
      station: getStationResolver,
      weather: getWeatherResolver,
    },
  };
  return resolvers;
}
