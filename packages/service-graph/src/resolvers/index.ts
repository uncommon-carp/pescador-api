import { getBulkStationQuery, getStationResolver } from "./station";
import { getWeatherResolver } from "./weather";

export function getResolvers() {
  const resolvers = {
    Query: {
      hello: () => "world",
      user: () => ({ email: "test@test.com", zipCode: 11111 }),
      station: getStationResolver,
      bulkStation: getBulkStationQuery,
      weather: getWeatherResolver,
    },
  };
  return resolvers;
}
