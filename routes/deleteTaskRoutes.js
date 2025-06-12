const express = require('express');
const router = express.Router();

const deleteTaskController = require('../controllers/deleteTaskController');

router.delete('/', deleteTaskController.deleteTask);

module.exports = router;