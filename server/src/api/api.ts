import { Router } from "express";
import registerRouter from "./register.js";

const api = Router();

api.use("/register", registerRouter);

export default api;
