async function validateToCreate(customer_id) {
    if (!customer_id) {
        return 'O id do cliente precisa ser informado!';
    }

    if (!Number.isInteger(customer_id)) {
        return 'O id do cliente precisa ser um número do tipo inteiro';
    }

    return true;
}

async function validateToUpdate(status) {
    if (!status) {
        return 'Status precisa ser informado!';
    }

    return true;
}

module.exports = {
    validateToCreate,
    validateToUpdate
}