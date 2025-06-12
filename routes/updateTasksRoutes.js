const express = require('express');
const router = express.Router();
const updateTasksController = require('../controllers/updateTaskController')

router.patch('/', updateTasksController.updateTasks);

module.exports = router;