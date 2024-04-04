const { productRepository } = require('../repositories/productRepository');
const { validate } = require('../service/product');

const getAllProducts = async (req, res) => {
    try {
        const result = await productRepository.list();
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: 'Erro ao buscar produtos!' });
    }
}


const createProduct = async (req, res) => {
    const { name, quantity_stock } = req.body;
    const quantity = Number(quantity_stock);

    const resultValidate = await validate(name, quantity);

    if (resultValidate !== true) {
        res.status(400).json({ error: resultValidate });
        return;
    }

    try {
        const result = await productRepository.create(name,  quantity_stock);
        
        if (!result) {
            res.status(400).json({ message: "Erro ao cadastrar produto" });
        }

        res.status(200).json({ message: result })
    } catch(error) {
        res.status(500).json({ error: "Erro ao cadastrar produto" });
    }

}

const updateProduct = async (req, res) => {
    const { name, quantity_stock } = req.body;
    const product_id = Number.parseInt(req.params.id);

    const quantity = Number(quantity_stock)

    const resultValidate = await validate(name, quantity);

    if (!resultValidate) {
        res.status(400).json({ error: resultValidate });
    }

    try {
        const result = await productRepository(name,  quantity_stock, product_id);
        res.status(200).json({ message: 'Produto atualizado com sucesso!' })
    } catch(error) {
        res.status(500).json({ message: 'Erro ao atualizar produto!' })
    }
}

const deleteProduct = async (req, res) => {
    const product_id = req.params.id;

    try {
        const result = await productRepository(product_id);
        res.status(200).json({ message: result })
    } catch(error) {
        res.status(500).json({ message: 'Erro ao excluir produto' })
    }
}


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}