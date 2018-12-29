const newLinkSubscribe = (parent, args, context, info) =>
  context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

module.exports = {
  newLink
};
