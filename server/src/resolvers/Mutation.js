// Link Management

const post = (root, { url, description }, context) =>
  context.prisma.createLink({
    url,
    description
  });

const updateLink = (root, { id, url, description }, context) =>
  context.prisma.updateLink({
    id,
    url,
    description
  });

const deleteLink = (root, { id }, context) =>
  context.prisma.deleteLink({
    id
  });

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
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  // Validate user
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error("No such user found");

  // Validate password
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  // JWT Auth
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

module.exports = {
  post,
  updateLink,
  deleteLink
};
