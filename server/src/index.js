const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

const resolvers = {
  Query: {
    info: () => null,
    feed: () => links
  },
  Link: {
    // id: parent => parent.id,
    // description: parent => parent.description,
    // url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
