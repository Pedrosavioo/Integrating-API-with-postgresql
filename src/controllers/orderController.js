const orderRepository = require('../repositories/orderRepository');
const { validateToCreate, validateToUpdate } = require('../service/order');

const getAllOrders = async (req, res) => {
    try {
        const result = await orderRepository.list();
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos!' });
    }
}

const createOrder = async (req, res) => {
    const { customer_id } = req.body;
    const customer = Number(customer_id);

    const resultValidate = await validateToCreate(customer_id);

    if (resultValidate !== true) {
        res.status(400).json({ error: resultValidate });
        return;
    }

    try {
        const result = await orderRepository.create(customer);
        
        if (!result) {
            res.status(400).json({ message: "Erro ao criar pedido" });
            return;
        }

        res.status(200).json({ message: result })
    } catch(error) {
        res.status(500).json({ error: "Erro ao criar pedido" });
    }

}

const updateOrder = async (req, res) => {
    const { status } = req.body;
    const order_id = Number.parseInt(req.params.id);

    const order = order_id;

    const resultValidate = await validateToUpdate(status);

    if (resultValidate !== true) {
        res.status(400).json({ error: resultValidate });
    }

    try {
        const result = await orderRepository.update(status, order_id);
        if (!result) {
            res.status(400).json({ message: 'Erro ao atualizar pedido!' })
        }

        res.status(200).json({ message: 'Pedido atualizado com sucesso!' })
    } catch(error) {
        res.status(500).json({ error: 'Erro ao atualizar pedido!' })
    }
}

const deleteOrder = async (req, res) => {
    const order_id = req.params.id;

    try {
        const result = await orderRepository.delete(order_id);
        if (!result) {
            res.status(400).json({ message: 'Erro ao remover pedido!' })
            return
        }

        res.status(200).json({ message: result })
    } catch(error) {
        res.status(500).json({ message: 'Erro ao remover pedido' })
    }
}


module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
}