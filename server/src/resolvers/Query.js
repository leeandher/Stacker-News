const info = () =>
  "This is an example API developed from a tutorial over at howtographql.com!";

const feed = (parent, args, context, info) => context.prisma.links();

const link = (parent, args, context, info) => context.prisma.link(...args);

module.exports = {
  info,
  feed,
  link
};
