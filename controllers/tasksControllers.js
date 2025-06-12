const { pool } = require('../config/db');

async function getAllTasks(req, res) {
    let connection;

    try{
        connection = await pool.getConnection();
        const [tasks] = await connection.execute('SELECT * FROM tasks');
        res.status(200).json(tasks);
    } catch(error){
        console.error('Erro ao tentar carregar as tarefas: ', error.message);
        res.status(500).json({message: "Erro interno do servidor ao buscar"});
    } finally {
        if(connection) connection.release();
    }

}

module.exports = {
    getAllTasks
}
