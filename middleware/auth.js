import jwt from 'jsonwebtoken'
const authenticateToken = (req, res, next) => {
    const token = req.headers.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attach user data to the request object
      console.log("Decoded Token:", req.user); // Debug log
      next();
    } catch (err) {
      return res.status(400).json({ message: "Invalid Token", error: err.message });
    }
  };
  
export default authenticateToken