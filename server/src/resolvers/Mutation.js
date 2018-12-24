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

module.exports = {
  post,
  updateLink,
  deleteLink
};
