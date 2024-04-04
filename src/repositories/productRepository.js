const { connectToDatabase }= require('../db/postgres')

const productRepository = {

    list: async (data) => {
        const client = await connectToDatabase();
        const query = 'SELECT * FROM product;';

        try {
            const result = await client.query(query);
            return result.rows;
        } catch(error) {
            return false;
        } finally {
            client.end();
        }
    },

    create: async (name, quantity) => {
        const client = await connectToDatabase();
        const query = 'INSERT INTO product (name, quantity_stock) VALUES ($1, $2);';

        try {
            const result = await client.query(query, [name, quantity]);
            return 'Produto cadastrado com sucesso';
        } catch(error) {
            return false;
        } finally {
            client.end();
        }
    },

    update: async (name, quantity, product_id) => {
        const client = await connectToDatabase();
        const query = 'UPDATE product SET name = $1, quantity_stock = $2 WHERE product_id = $3';

        try {
            const result = await client.query(query, [username, quantity, product_id]);
            return 'Produto atualizado com sucesso!'
        } catch (error) {
            return 'Erro ao atualizar usuário';
        } finally {
            client.end();
        }
    }
}

module.exports = {
    productRepository
}