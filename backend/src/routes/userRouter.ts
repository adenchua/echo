import { Router } from "express";

import createUser, { createUserValidationChains } from "../controllers/user/createUser";
import getUser, { getUserValidationChains } from "../controllers/user/getUser";
import getUsers, { getUsersValidationChains } from "../controllers/user/getUsers";
import loginUser, { loginUserValidationChains } from "../controllers/user/loginUser";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const userRouter = Router();

userRouter.get("/:userId", getUserValidationChains, validationErrorMiddleware, getUser);
userRouter.post("/bulk-fetch", getUsersValidationChains, validationErrorMiddleware, getUsers);
userRouter.post("/", createUserValidationChains, validationErrorMiddleware, createUser);
userRouter.post("/login", loginUserValidationChains, validationErrorMiddleware, loginUser);

export default userRouter;
