const User = require("../models/user");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

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
    user.password = undefined; // remove password from being sent back
    res.status(200).send(user);
  } catch (error) {
    console.error("getUserByUsername Error", error);
    res.status(500).send();
  }
};

module.exports.getUsers = async (req, res) => {
  const { userIds } = req.body;
  const users = [];

  if (!userIds || !Array.isArray(userIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const userId of userIds) {
      const user = await User.findById(userId);
      user.password = undefined;
      users.push(user);
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("getUsers", error);
    res.status(500).send();
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      user.password = undefined;
      return user;
    });
    res.status(200).send(users);
  } catch (error) {
    console.error("getAllUsers", error);
    res.status(500).send();
  }
};

module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { displayName, bio, title } = req.body;

  if (!userId) {
    res.status(400).send();
    return;
  }

  try {
    const keysToUpdate = removeUndefinedKeysFromObject({ displayName, bio, title });
    await User.findByIdAndUpdate(userId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateUser", error);
    res.status(500).send();
  }
};
