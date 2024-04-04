const { connectToDatabase }= require('../db/postgres')

const orderRepository = {

    list: async (data) => {
        const client = await connectToDatabase();
        const query = 'SELECT * FROM orders;';

        try {
            const result = await client.query(query);
            return result.rows;
        } catch(error) {
            return false;
        } finally {
            client.end();
        }
    },

    create: async (customer_id) => {
        const client = await connectToDatabase();
        const query = 'INSERT INTO orders (customer_id) VALUES ($1);';

        try {
            const result = await client.query(query, [customer_id]);
            return 'Pedido criado com sucesso';
        } catch(error) {
            return false;
        } finally {
            client.end();
        }
    },

    update: async (status, order_id) => {
        const client = await connectToDatabase();
        const query = 'UPDATE orders SET status = $1 WHERE order_id = $2';

        try {
            const result = await client.query(query, [status, order_id]);
            return 'Pedido atualizado com sucesso';
        } catch (error) {
            return false;
        } finally {
            client.end();
        }
    },

    delete: async (order_id) => {
        const client = await connectToDatabase();
        const query = 'DELETE FROM orders WHERE order_id = $1';

        try {
            const result = await client.query(query, [order_id]);
            return 'Pedido removido com sucesso!';
        } catch (error) {
            return false;
        } finally {
            client.end();
        }
    }
}

module.exports = orderRepository;