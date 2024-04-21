import { Router } from "express";

import {
  addTicketToEpic,
  createEpic,
  getEpics,
  removeTicketFromEpic,
  updateEpic,
  deleteEpic,
} from "../controllers/epic.js";

const router = Router();

router.route("/").post(createEpic);
router.route("/id/:epicId").patch(updateEpic);
router.route("/id/:epicId").delete(deleteEpic);
router.route("/bulk-retrieve").post(getEpics);
router.route("/add-ticket/:epicId").post(addTicketToEpic);
router.route("/remove-ticket/:epicId").post(removeTicketFromEpic);

export default router;
