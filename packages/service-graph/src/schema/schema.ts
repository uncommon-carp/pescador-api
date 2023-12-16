export const typeDefs = `
  type Query {
    hello: String
    user: User
    station: Station
  }
  
  type Station {
    name: String!
    usgsId: String!
    lat: Int
    lon: Int
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
    value: Int!
  }

  type User {
    email: String!
    zipCode: Int
  }
`;
