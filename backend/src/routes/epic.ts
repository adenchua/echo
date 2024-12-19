import { Router } from "express";

import {
  addTicketToEpic,
  createEpic,
  deleteEpic,
  getEpics,
  removeTicketFromEpic,
  updateEpic,
} from "../controllers/epic";
import {
  addTicketToEpicValidationChain,
  createEpicValidationChain,
  deleteEpicValidationChain,
  getEpicsValidationChain,
  removeTicketFromEpicValidationChain,
  updateEpicValidationChain,
} from "../middlewares/epicValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/").post(createEpicValidationChain, validationErrorMiddleware, createEpic);
router.route("/id/:epicId").patch(updateEpicValidationChain, validationErrorMiddleware, updateEpic);
router
  .route("/id/:epicId")
  .delete(deleteEpicValidationChain, validationErrorMiddleware, deleteEpic);
router.route("/bulk-retrieve").post(getEpicsValidationChain, validationErrorMiddleware, getEpics);
router
  .route("/add-ticket/:epicId")
  .post(addTicketToEpicValidationChain, validationErrorMiddleware, addTicketToEpic);
router
  .route("/remove-ticket/:epicId")
  .post(removeTicketFromEpicValidationChain, validationErrorMiddleware, removeTicketFromEpic);

export default router;
