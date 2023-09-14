export const typeDefs = `
  type Query {
    hello: String
    user: User
  }
  
  type User {
    email: String!
    zipCode: Int
  }
`;
