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
import {
  projectIdIn,
  projectOf,
  requireProjectRole,
} from "../middlewares/projectAuthorizationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

const epicFromParams = projectOf("epic", "params", "epicId");
const ticketFromBody = projectOf("ticket", "body", "ticketId");

router
  .route("/")
  .post(
    createEpicValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectIdIn("body", "projectId")),
    createEpic,
  );
router
  .route("/id/:epicId")
  .patch(
    updateEpicValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", epicFromParams),
    updateEpic,
  );
router
  .route("/id/:epicId")
  .delete(
    deleteEpicValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", epicFromParams),
    deleteEpic,
  );
router
  .route("/bulk-retrieve")
  .post(
    getEpicsValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("epic", "body", "epicIds")),
    getEpics,
  );
router
  .route("/add-ticket/:epicId")
  .post(
    addTicketToEpicValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", epicFromParams, ticketFromBody),
    addTicketToEpic,
  );
router
  .route("/remove-ticket/:epicId")
  .post(
    removeTicketFromEpicValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", epicFromParams, ticketFromBody),
    removeTicketFromEpic,
  );

export default router;
