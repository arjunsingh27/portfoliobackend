const Projects = require('../models/projects');

exports.getAllProjects = async (req, res) => {
  try {
    const projectList = await Projects.find().sort({ id: 1 });
    res.json(projectList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { projecttitle, projectdescription, projectimage, url, githubUrl, datecreated, passward } = req.body;

  if (passward !== '12345') {
    return res.status(403).json({ message: 'Invalid password' });
  }

  try {
    const newProject = new Projects({
      projecttitle,
      projectdescription,
      projectimage,
      url,
      githubUrl,
      datecreated,
      passward,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add project', error });
  }
};
