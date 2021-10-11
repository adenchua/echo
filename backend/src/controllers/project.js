const Project = require("../models/project");

module.exports.createProject = async (req, res) => {
  const { title, adminId } = req.body;

  if (!title || !adminId) {
    res.status(400).send();
    return;
  }

  try {
    const newProject = new Project({ title, admins: [adminId] });
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    console.error("createProject error", error);
    res.status(500).send();
  }
};
