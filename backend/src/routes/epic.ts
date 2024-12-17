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
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/").post(createEpicValidationChain, validationErrorHandling, createEpic);
router.route("/id/:epicId").patch(updateEpicValidationChain, validationErrorHandling, updateEpic);
router.route("/id/:epicId").delete(deleteEpicValidationChain, validationErrorHandling, deleteEpic);
router.route("/bulk-retrieve").post(getEpicsValidationChain, validationErrorHandling, getEpics);
router
  .route("/add-ticket/:epicId")
  .post(addTicketToEpicValidationChain, validationErrorHandling, addTicketToEpic);
router
  .route("/remove-ticket/:epicId")
  .post(removeTicketFromEpicValidationChain, validationErrorHandling, removeTicketFromEpic);

export default router;
