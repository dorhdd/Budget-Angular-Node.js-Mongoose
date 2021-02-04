module.exports = (req, res, next) => {
  if (!req.session.user.activeBudget) {
    return res.send({ redirect: "/newBudget" });
  }
  next();
};
