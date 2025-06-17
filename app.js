const express = require('express');
const app = express();
const {testConnection} = require('./config/db.js');

const tasksRoutes = require('./routes/tasksRoutes.js');
const postTask = require('./routes/postsTasksRoutes.js');
const updateTask = require('./routes/updateTasksRoutes.js');
const deleteTask = require('./routes/deleteTaskRoutes.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

testConnection();

app.use('/todolist/tasks', tasksRoutes);
app.use('/todolist/postTask', postTask);
app.use('/todolist/updatetask', updateTask);
app.use('/todolist/deleteTask', deleteTask);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server rodando!');
});
