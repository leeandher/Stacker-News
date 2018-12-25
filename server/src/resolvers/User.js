const links = ({ id }, args, context) => context.prisma.user({ id }).links();

module.exports = {
  links
};
