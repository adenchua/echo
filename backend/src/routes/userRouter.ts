import { Router } from "express";

import createUser, { createUserValidationChains } from "../controllers/user/createUser";
import getUserById, { getUserByIdValidationChains } from "../controllers/user/getUserById";
import getUsersByIds, { getUsersByIdsValidationChains } from "../controllers/user/getUsersByIds";
import loginUser, { loginUserValidationChains } from "../controllers/user/loginUser";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";
import getUsers from "../controllers/user/getUsers";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserByIdValidationChains, validationErrorMiddleware, getUserById);

userRouter.post(
  "/bulk-fetch",
  getUsersByIdsValidationChains,
  validationErrorMiddleware,
  getUsersByIds,
);
userRouter.post("/", createUserValidationChains, validationErrorMiddleware, createUser);
userRouter.post("/login", loginUserValidationChains, validationErrorMiddleware, loginUser);

export default userRouter;
