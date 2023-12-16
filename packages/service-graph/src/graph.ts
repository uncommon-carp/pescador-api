import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { typeDefs } from "./schema/schema";

const resolvers = {
  Query: {
    hello: () => "world",
    user: () => ({ email: "test@test.com", zipCode: 11111 }),
    station: () => ({
      name: "Test",
      usgsId: "01234",
      lat: 10,
      lon: 10,
      values: { flow: { timestamp: "1010101", value: 10 } },
    }),
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
