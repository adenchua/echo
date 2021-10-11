const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  const { username, password, displayName } = req.body;

  if ((!username, !password, !displayName)) {
    res.status(400).send();
    return;
  }

  try {
    const newUser = new User({ username, password, displayName });
    await newUser.save();
    newUser.password = undefined; // remove password from being sent back
    res.status(201).send(newUser);
  } catch (error) {
    console.error("createUser Error", error);
    res.status(500).send();
  }
};

module.exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    res.status(400).send();
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send();
      return;
    }
    user.password = undefined; // remove password from being sent back
    res.status(200).send(user);
  } catch (error) {
    console.error("getUserByUsername Error", error);
    res.status(500).send();
  }
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send();
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send();
      return;
    }
    user.password = undefined; // remove password from being sent back
    res.status(200).send(user);
  } catch (error) {
    console.error("getUserByUsername Error", error);
    res.status(500).send();
  }
};
