import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { typeDefs } from "./schema/schema";
import { getStationResolver } from "./resolvers";
import { getWeatherResolver } from "./resolvers/weather";

const resolvers = {
  Query: {
    hello: () => "world",
    user: () => ({ email: "test@test.com", zipCode: 11111 }),
    station: getStationResolver,
    weather: getWeatherResolver,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
