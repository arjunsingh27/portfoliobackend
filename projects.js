const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  datecreated: {
    type: Date,
    required: true,
  }
});

const projects = mongoose.model('projects', projectsSchema);

module.exports = projects;
