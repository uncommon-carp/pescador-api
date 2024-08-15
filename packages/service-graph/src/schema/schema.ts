export const typeDefs = `
  type Query {
    hello: String
    user: User
    station(id: String!): Station
    weather(zip: Float!): CurrentWeather
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
