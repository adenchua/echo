import { Router } from "express";
import passport from "passport";

import login from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";

import "../auth/strategies/localStrategy";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), login);
authRouter.post("/logout", authenticationMiddleware, logout);

export default authRouter;
