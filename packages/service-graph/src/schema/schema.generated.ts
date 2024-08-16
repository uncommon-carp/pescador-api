export const typeDefs = `#graphql
  scalar DateTime

type Query {
  hello: String
  user: User
  station(id: String!, range: Int!): StationWithRange
  bulkStation(zip: String!): BulkStation
  weather(zip: String!): CurrentWeather
}

interface Station {
  name: String!
  usgsId: String!
  lat: Float
  lon: Float
}

type StationWithRange implements Station {
  name: String!
  usgsId: String!
  lat: Float
  lon: Float
  values: ReportedValues
}

type SingleStation implements Station {
  name: String!
  usgsId: String!
  lat: Float
  lon: Float
  gageHt: Float
  flowRate: Float
}

type BulkStation {
  streams: [SingleStation]
  lakes: [SingleStation]
}

type ReportedValues {
  flow: [DataFrame]
  gage: [DataFrame]
  height: [DataFrame]
  temp: [DataFrame]
}

type DataFrame {
  timestamp: String
  value: Float
}

type CurrentWeather {
  temp: Float!
  wind: WindData
  pressure: Float!
  humidity: Float!
  clouds: String!
}

type WindData {
  speed: Float
  direction: Float
  gust: Float
}

type User {
  email: String!
  zipCode: Int
}
`;
