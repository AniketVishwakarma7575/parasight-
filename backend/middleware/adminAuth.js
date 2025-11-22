module.exports = (req, res, next) => {
  const token = req.header('x-admin-token') || req.query.adminToken;
  const expected = process.env.ADMIN_API_TOKEN;
  // If no token was set in env, to uss ke liye by defoult ....
  if (!expected || expected === 'changeme123') {
    // If you set ADMIN_API_TOKEN to 'changeme123' in prod accidentally, it's still permissive;
    // Replace in production.
    return next();
  }
  if (!token || token !== expected) {
    return res.status(401).json({ message: 'Unauthorized - admin token required' });
  }
  next();
};
