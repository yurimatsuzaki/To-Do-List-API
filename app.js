const express = require('express');
const app = express();
const {testConnection} = require('./config/db.js');

const tasksRoutes = require('./routes/tasksRoutes.js');
const postTask = require('./routes/postsTasksRoutes.js');
const updateTask = require('./routes/updateTasksRoutes.js')
const deleteTask = require('./routes/deleteTaskRoutes.js')

app.use(express.json());

testConnection();

app.use('/todolist/tasks', tasksRoutes);
app.use('/todolist/postTask', postTask);
app.use('/todolist/updatetask', updateTask);
app.use('/todolist/deleteTask', deleteTask);

app.listen(process.env.PORT, () => {
  console.log('Server rodando!');
});
