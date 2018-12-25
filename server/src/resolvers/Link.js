const postedBy = ({ id }, argss, context) =>
  context.prisma.link({ id }).postedBy;

module.exports = {
  postedBy
};
