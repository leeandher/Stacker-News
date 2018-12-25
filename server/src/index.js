// Import the dependencies
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    // Test
    info: () => "This is a GraphQL API",
    // View all link
    feed: () => (root, args, context, info) => {
      return context.prisma.links();
    }
    /* TODO: Refactor for Prisma Client

    // Get a link by ID
    link: (root, { id }) => links.find(el => el.id === id)

    */
  },

  Mutation: {
    // Post a link
    post: (root, { url, description }, context) => {
      return context.prisma.createLink({
        url,
        description
      });
    }

    /* TODO: Refactor for Prisma Client

    // Update a posted link
    update: (root, { id, url, description }) => {
      const linkIndex = links.findIndex(el => el.id === id);
      if (linkIndex >= 0) {
        if (url) links[linkIndex].url = url;
        if (description) links[linkIndex].description = description;
      }
      return links[linkIndex];
    },

    // Delete a posted link
    delete: (root, { id }) => {
      const linkIndex = links.findIndex(el => el.id === id);
      let link;
      if (linkIndex >= 0) {
        link = links[linkIndex];
        links.splice(linkIndex, 1);
      }
      return link;
    }

    */
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
