import { Router } from "express";
import * as db from "../utils/db.js";
import { compareSync as compare } from "bcrypt";
import jwt from "jsonwebtoken";

const login = Router();

login.get("/", (_, res) => {
  res.sendStatus(405); // Method not allowed
});

login.post("/", async (req, res) => {
  if (!req.secure) return res.status(426).send("Use https for this route");
  if (!req.body) return res.sendStatus(400);

  if (req.cookies.refreshToken) return res.sendStatus(201);
  const reqBody = req.body;
  const { username, password } = reqBody;
  if (!username || !password)
    return res.status(400).send("Username or Password not available");

  const dbRes = await db.getHash(username);
  if (dbRes.ok) {
    const auth = compare(password, dbRes.data);
    if (!auth) return res.sendStatus(401);

    const refreshToken = jwt.sign(
      { username },
      process.env["JWT_REFRESH_SECRET"]!,
      { expiresIn: "7 d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.sendStatus(201);
    return;
  }

  switch (dbRes.e_type) {
    case "USER NOT FOUND":
      return res.status(404).send("User Not FOundw");
    case "UNHANDLED":
      return res.sendStatus(500);
    default:
      return;
  }
});

export default login;
