const schema = `
type Connection {
  id: ID!
  cities: [String]!
  color: String!
  length: Int!
  tunnel: Boolean!
  wilds: Int!
}

#returns list of Tweets
type Query {
  getConnections: [Connection]
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
