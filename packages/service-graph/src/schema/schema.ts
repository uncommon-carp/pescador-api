export const typeDefs = `
  type Query {
    hello: String
    user: User
    station(id: String!): Station
  }
  
  type Station {
    name: String!
    usgsId: String!
    lat: Float
    lon: Float
    values: ReportedValues
  }

  type ReportedValues {
    flow: DataFrame
    gage: DataFrame
    height: DataFrame
    temp: DataFrame
  }

  type DataFrame {
    timestamp: String!
    value: Float!
  }

  type User {
    email: String!
    zipCode: Int
  }
`;
