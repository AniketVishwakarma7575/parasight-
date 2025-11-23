module.exports = (req, res, next) => {
  const token = req.header('x-admin-token') || req.query.adminToken;
  const expected = process.env.ADMIN_API_TOKEN;


  if (!expected || expected === "changeme123") {
    return next();
  }

//   here i am trying to protect the route and send admin token 

  // // Validate admin token
  // if (!token || token !== expected) {
  //   return res
  //     .status(401)
  //     .json({ message: "Unauthorized - admin token required" });
  // }

  next();
};
