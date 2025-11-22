const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    const admin = await Admin.findById(decoded.id);
    if (!admin) throw new Error();
    req.admin = admin; // attach admin to request
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
