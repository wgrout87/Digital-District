// Function for checking whether a user is logged in or not
const withAuth = (req, res, next) => {
  // Will redirect the user to the login page if they aren't logged in
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  // The next function will be called if the user is logged in
  else {
    next();
  }
};

module.exports = withAuth;
