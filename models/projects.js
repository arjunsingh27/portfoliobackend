const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  projecttitle: {
    type: String,
    required: true,
  },
  projectdescription: {
    type: String,
    required: true,
  },
  projectimage: {
    type: String,
    // required: false,
  },
  url: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  datecreated: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
    required: true,
  },
  passward: {
    type: String,
    required: true,
  },
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;
