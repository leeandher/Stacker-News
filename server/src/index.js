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

    // Update a posted link
    updateLink: (parent, { id, url, description }) => {
      const linkIndex = links.findIndex(el => el.id === id);
      if (linkIndex >= 0) {
        if (url) links[linkIndex].url = url;
        if (description) links[linkIndex].description = description;
      }
      return links[linkIndex];
    },

    // Delete a posted link
    deleteLink: (parent, { id }) => {
      const linkIndex = links.findIndex(el => el.id === id);
      let link;
      if (linkIndex >= 0) {
        link = links[linkIndex];
        links.splice(linkIndex, 1);
      }
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
