const mysql = require('mysql2/promise');
const pool = mysql.createPool({ // pool de coenxões é uma série de conexões constroladas e gerenciadas por esse pool. Ele pega uma conexão disponível e depois devolve ela.

    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,

    waitForConnections: true, // quando true, ele aguarda conexões disponíveis, se false ele lança um erro
    connectionLimit: 20, // coloca um número máximo de conexões que podem ser abertas ao mesmo tempo. O valor pode ser ajustado conforme a necessidade e capacidade
    queueLimit: 0 // impõe um limite para requisições 'empilhadas', no caso de 0, não há limite e podem esperar indefinidamente
});

const testConnection = async () =>{ // Função acíncrona que testa a conexão com o banco de dados e que será executada no inicio do 'app.js'
    let connection;
    try{
        //tenta conseguir uma conexão do pool. Isso verifica todos os parâmetros do banco
        connection = await pool.getConnection();
        console.log('Conexão bem sucedida');
    } catch (error){
        console.error('erro ao conectar com o banco: ', error.message);
        process.exit(1); // termina um processo com um código de erro, indicando falha
    } finally { // esse bloco garante que o código de baixo seja executado independente se deu errado ou não
        if(connection) connection.release();
    }
}

// exporta a cosntante pool e a função testConnection()
module.exports = {
    pool,
    testConnection
};