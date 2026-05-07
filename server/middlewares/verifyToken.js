import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const headerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  const token = cookieToken || headerToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
