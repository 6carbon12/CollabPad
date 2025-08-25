import { Router } from "express";
import jwt from "jsonwebtoken";
import { type Token } from "@shared/Token";

const refresh = Router();

refresh.get("/", (req, res) => {
  if (!req.secure) return res.status(426).send("Use https for this route");

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).send("refresh token not found");

  try {
    const payload: Token = jwt.verify(
      refreshToken,
      process.env["JWT_REFRESH_SECRET"]!,
    );

    const token = jwt.sign(
      { username: payload.username },
      process.env["JWT_SECRET"]!,
      { expiresIn: "15 min" },
    );

    const payloadDecoded = JSON.parse(
      Buffer.from(token.split(".")[1]!, "base64").toString(),
    );
    const exp = payloadDecoded.exp;
    const iat = payloadDecoded.iat;

    return res.status(200).send({ token, exp, iat });
  } catch (e) {
    return res.status(403).send("Refresh Token Invalid");
  }
});

export default refresh;
