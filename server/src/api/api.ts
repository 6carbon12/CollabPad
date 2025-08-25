import { Router } from "express";
import registerRouter from "./register.js";
import refreshRouter from "./refresh.js"
import loginRouter from "./login.js"

const api = Router();

api.use("/register", registerRouter);
api.use("/refresh", refreshRouter);
api.use("/login", loginRouter);

export default api;
