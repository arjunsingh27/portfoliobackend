const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.get('/', projectsController.getAllProjects);
router.post('/', projectsController.createProject);

module.exports = router;
