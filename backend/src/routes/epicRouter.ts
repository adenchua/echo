import { Router } from "express";

import addTicketToEpic from "../controllers/epic/addTicketToEpic";
import createEpic from "../controllers/epic/createEpic";
import deleteEpic from "../controllers/epic/deleteEpic";
import getEpics from "../controllers/epic/getEpics";
import removeTicketFromEpic from "../controllers/epic/removeTicketFromEpic";
import updateEpic from "../controllers/epic/updateEpic";
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
