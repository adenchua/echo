import { Router } from "express";

import createUser, { createUserValidationChains } from "../controllers/user/createUser";
import getUserById, { getUserByIdValidationChains } from "../controllers/user/getUserById";
import getUsers from "../controllers/user/getUsers";
import getUsersByIds, { getUsersByIdsValidationChains } from "../controllers/user/getUsersByIds";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

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

export default userRouter;
