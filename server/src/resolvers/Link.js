// Resolves the 'User' field on Link type in '../schema.graphql'
const postedBy = ({ id }, args, context) =>
  context.prisma.links({ id }).postedBy();

module.exports = {
  postedBy
};
