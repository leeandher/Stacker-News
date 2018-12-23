const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    // Test
    info: () => "This is a GraphQL API",
    // View all link
    feed: () => links,
    // Get a link by ID
    link: (parent, { id }) => links.find(el => el.id === id)
  },
  Mutation: {
    // Post a link
    postLink: (parent, { url, description }) => {
      const link = {
        id: `link-${idCount++}`,
        url: url,
        description: description
      };
      links.push(link);
      return link;
    },

    updateLink: (parent, { url, description }) => {
      return null;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
