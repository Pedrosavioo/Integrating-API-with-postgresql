const { connectToDatabase } = require('../db/postgres');

const userRepositoty = {

    list: async () => {
        const client = await connectToDatabase();
        const query = 'SELECT * FROM "user"';

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            return false;
        } finally {
            client.end();
        }
    },

    create: async (username, password, email) => {
        const client = await connectToDatabase();
        const query = 'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *;';
        const values = [username, email, password];

        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário');
        } finally {
            client.end();
        }
    },

    update: async (username, user_id) => {
        const client = await connectToDatabase();
        const query = 'UPDATE "user" SET username = $1 WHERE user_id = $2';

        try {
            const result = await client.query(query, [username, user_id]);
            return 
        } catch (error) {
            return 'Erro ao atualizar usuário';
        } finally {
            client.end();
        }
    },
    
    delete: async (user_id) => {
        const client = await connectToDatabase();
        const query = 'DELETE FROM "user" WHERE user_id = $1;';

        try {
            const result = await client.query(query, [user_id]);
            return 'Usuário apagado com sucesso!';
        } catch (error) {
            return 'Erro: ' + error;
        } finally {
            client.end();
        }
    }
}

module.exports = userRepositoty;