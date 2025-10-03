const jwt = require("jsonwebtoken");
const secret_key = "Secret_key";
async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(401).json({
        message: "Auth is Missing....",
      });
    }
    let token = auth.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is Missing",
      });
    }

    const decodedToken = await jwt.verify(token, secret_key);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log("Error while authenticating the token", error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}
module.exports = { authMiddleware };
