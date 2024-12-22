import { Router } from "express";
import passport from "passport";

import checkSession from "../controllers/auth/checkSession";
import createAccount, { createAccountValidationChains } from "../controllers/auth/createAccount";
import login from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

import "../auth/strategies/localStrategy";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), login);
authRouter.post("/logout", authenticationMiddleware, logout);
authRouter.post(
  "/create-account",
  createAccountValidationChains,
  validationErrorMiddleware,
  createAccount,
);
authRouter.get("/me", checkSession);

export default authRouter;
