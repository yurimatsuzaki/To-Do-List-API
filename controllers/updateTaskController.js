const { pool } = require('../config/db');

async function updateTasks(req,res) {
    let connection;
    try{
        connection = await pool.getConnection();
        const [task] = await connection.execute('UPDATE tasks SET title = ?, task = ?, stay = ? WHERE idTask = ?', ['olá Mundo','pimba la pimba tchelele','finished','3']);

        res.status(201).json({message: "Tarefa Atualizada com sucesso!"})
    } catch (error){
        console.error("Erro ao atualizar sua tarefa: ", error.message);
        res.status(500).json({Error: "Erro ao tentar atualizar sua tarefa!"})
    } finally {
        if(connection) connection.release();
    }
}

module.exports={
    updateTasks
}