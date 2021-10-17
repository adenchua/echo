const { Router } = require("express");

const {
  createUser,
  getUserByUsername,
  getAllUsers,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/user");

const router = Router();

router.route("/").post(createUser);
router.route("/id/:userId").patch(updateUser);
router.route("/id/:userId").get(getUserById);
router.route("/username/:username").get(getUserByUsername);
router.route("/all").get(getAllUsers);
router.route("/bulk-retrieve").post(getUsers);

module.exports = router;
