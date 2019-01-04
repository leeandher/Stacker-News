// Get packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserId } = require("../utils");

// Authentication

const signup = async (parent, args, context, info) => {
  // Hash the password
  const password = await bcrypt.hash(args.password, 10);

  // Create the user
  const user = await context.prisma.createUser({
    ...args,
    password
  });

  // JWT Auth
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // Return an object in the same structure as the AuthPayload in schema.graphql
  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  // Find the user
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error("No such user found");

  // Validate password
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  // JWT Auth
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // Return an object in the same structure as the AuthPayload in schema.graphql
  return {
    token,
    user
  };
};

// Link Management

const post = (parent, { url, description }, context, info) => {
  // Get the logged in user
  const userId = getUserId(context);
  // Create their link
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

const vote = async (parent, { linkId }, context, info) => {
  // Get the logged in user
  const userId = getUserId(context);
  // Check that no link exists already
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  });
  if (linkExists) throw new Error(`Already voted for link: ${linkId}`);

  // Connect this vote instance to the user and link
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};

module.exports = {
  signup,
  login,
  post,
  vote
};
