const express = require('express');
const router = express.Router();
const updateTasksController = require('../controllers/updateTaskController')

router.put('/', updateTasksController.updateTasks);

module.exports = router;