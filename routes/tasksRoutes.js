const express = require('express');
const router = express.Router();

const tasksControllers = require('../controllers/tasksControllers.js');

router.get('/', tasksControllers.getAllTasks);

module.exports = router;
