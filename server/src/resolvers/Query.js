const info = () =>
  `This is a GraphQL Server powering the HackerNews clone: StackerNews!`;

const feed = async (
  parent,
  { filter, skip, first, orderBy },
  context,
  info
) => {
  const where = filter
    ? {
        OR: [{ description_contains: filter }, { url_contains: filter }]
      }
    : {};
  return await context.prisma.links({ where, skip, first, orderBy });
};

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
