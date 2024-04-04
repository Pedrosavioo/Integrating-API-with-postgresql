const { Client } = require('pg');
const dotenv = require('dotenv').config();


async function connectToDatabase(){
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'ecommerce',
        password: process.env.USER_PASSWORD,
        port: 5432,
    });
    
    try {
        await client.connect();
        console.log('Conexão bem-sucedida!');
        return client;
    } catch (error) {
        console.error('Erro de conexão:', error);
        throw error;
    }
}

module.exports = {
    connectToDatabase
};