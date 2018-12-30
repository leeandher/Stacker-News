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
  const userId = getUserId(context);
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

module.exports = {
  signup,
  login,
  post
};
