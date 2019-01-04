const info = () =>
  `This is a GraphQL Server powering the HackerNews clone: StackerNews!`;

const feed = (parent, args, context, info) => context.prisma.links();

const user = (parent, { userId }, context, info) =>
  context.prisma.user({ id: userId });

const link = (parent, { linkId }, context, info) =>
  context.prisma.link({ id: linkId });

module.exports = {
  info,
  feed,
  user,
  link
};
