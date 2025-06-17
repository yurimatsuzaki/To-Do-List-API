const { pool } = require('../config/db');

async function postTasksControllers(req, res) {
    let connection; 

    try{
        const {title, task ,stay} = req.body;
        connection = await pool.getConnection();
        
        const [tasks] = await connection.execute('INSERT INTO tasks (idTask,title,task,stay) VALUES (?,?,?,?)', ["0", title,task,stay]);

        res.status(201).json({
            message:"Tarefa registrada com sucesso!"
        })
    } catch(error){
        console.error("Erro ao tentar salvar tarefa: ", error.message);a

        res.status(500).json({message: "Erro interno ao tentar salvar sua tarefa!"});
    } finally {
        if(connection) connection.release();
    }
}

module.exports = {
    postTasksControllers
}