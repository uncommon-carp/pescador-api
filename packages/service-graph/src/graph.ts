import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { typeDefs } from "./schema/schema";
import { getStationResolver } from "./resolvers";

const resolvers = {
  Query: {
    hello: () => "world",
    user: () => ({ email: "test@test.com", zipCode: 11111 }),
    station: getStationResolver,
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
