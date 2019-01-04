// Resolves the 'User' field on Link type in '../schema.graphql'
const postedBy = ({ id }, args, context) => {
  return context.prisma.link({ id }).postedBy();
};

module.exports = {
  postedBy
};
