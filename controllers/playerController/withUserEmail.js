const withUserEmail = playerDoc => {
  const obj = playerDoc.toJSON ? playerDoc.toJSON() : playerDoc;
  if (obj.user && obj.user.email) {
    obj.userEmail = obj.user.email;
    obj.user = obj.user.id || obj.user._id;
  }
  return obj;
};
module.exports = withUserEmail;
