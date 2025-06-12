const { pool } = require('../config/db');

let title = 'Titulo 1';
let task = 'Diga isso ao cara que me disse';
let stay = 'in progress';

async function postTasksControllers(req, res) {
    let connection; 

    try{
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