const { pool } = require('../config/db');

async function deleteTask(req, res) {
    let connection;
    try{
        connection = await pool.getConnection();
        const [task] = await connection.execute('DELETE FROM tasks WHERE idTask = ?',['2']);

        res.status(201).json({message:"Tarefa deletada com sucesso!"});
    } catch(error){
        console.error('Erro ao tentar apagar uma tarefa!', error.message);
        res.status(500).json({Error: "Erro interno ao tentar apagar uma tarefa!"});
    } finally {
        if(connection) connection.release();
    }
}

module.exports ={
    deleteTask
}