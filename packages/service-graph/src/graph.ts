import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from './schema/schema';

const resolvers = {
  Query: {
    hello: () => 'world'
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const graphqlHandler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler());
