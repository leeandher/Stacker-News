// Import the dependencies
require("dotenv").config({ path: "settings.env" });
const { GraphQLServer } = require("graphql-yoga");

// Import the resolvers

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
    info: () => `This is an API of StackerNews, a HackerNews clone`,
    feed: () => links
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
