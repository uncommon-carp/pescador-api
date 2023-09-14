import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from './schema/schema';

const resolvers = {
  Query: {
    hello: () => 'world',
    user: () => ({email: 'test@test.com', zipcode: 11111 }),
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler());
