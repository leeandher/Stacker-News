// Get packages
const jwt = require("jsonwebtoken");

// Return the userId in the Authentication header if present
const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    console.log(userId);
    return userId;
  }
  throw new Error("Not authenticated");
};

module.exports = {
  getUserId
};
