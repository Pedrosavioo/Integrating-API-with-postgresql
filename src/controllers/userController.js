const service = require('../service/user');
const userRepository = require('../repositories/userRepository');

const list = async (req, res) => {
    try {
        const result = await userRepository.list();

        if (result === 'Erro ao buscar usuários') {
            res.status(400).json({ error: result })
            return;    
        }

        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
}

const createUser = async (req, res) => {
    const { username, password, email } = req.body;

    // validação da requisição
    const validate = await service.validCreateUser(username, password, email);

    if (validate !== true) {
        res.status(400).json({ message: validate });
        return;
    }

    const newUser = {
        username: username,
        password: password,
        email: email
    }

    try {
        const result = await userRepository.create(username, password, email);
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!', user: newUser })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
}

const updateUser = async (req, res) => {
    const { username } = req.body;
    const id = req.params.id;
    
    if (!username) {
        res.status(400).json({ message: 'Username precisa ser informado para atualizar registro!' });
        return;
    }

    try {
        const result = await userRepository.update(username, Number(id));
        res.status(200).json({ message: `usuário com id ${id} atualizado com sucesso!` })
    } catch (error) {
        res.status(500).json({ error: `Erro ao atualizar usuário!` })
    }
}

const deleteuser = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await userRepository.delete(Number(id));
        res.status(200).json({ message: `Usuário com id ${id} apagado com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar usuário' });
    }
}


module.exports = {
    list,
    createUser,
    updateUser,
    deleteuser
}