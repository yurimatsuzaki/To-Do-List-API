const express = require('express');
const routes = express.Router();

const postTasksControllers = require('../controllers/postTasksControllers');

routes.post('/', postTasksControllers.postTasksControllers);

module.exports = routes;