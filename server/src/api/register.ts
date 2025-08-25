import { Router } from "express";
import * as db from "../utils/db.js";
import { hashSync as hash } from "bcrypt";

const register = Router();

register.get("/", (_, res) => {
  res.sendStatus(405); // Method not allowed
});

register.post("/", async (req, res) => {
  if (!req.secure) return res.status(426).send("Use https for this route"); // Upgrade required
  if (!req.body) return res.sendStatus(400);

  const reqBody = req.body;
  const { username, password } = reqBody;
  if (!username || !password) return res.status(400).send("Data invaild");

  // TODO: check username before hashing
  const pHash = hash(password, 13);

  const dbRes = await db.addUser(username, pHash);
  if(dbRes.ok) return res.sendStatus(201)

  switch (dbRes.e_type) {
    case "USER EXISTS":
      res.status(409).send("User Exists, try logging in");
      return;
    case "UNHANDLED":
      res.sendStatus(500);
      return;
    default:
      return;
  }
});

export default register;
