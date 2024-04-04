async function validate(name, quantity) {
    if (!name) {
        return 'Name precisa ser informado!';
    }

    if (!quantity) {
        return 'A quantidade precisa ser informada!';
    }

    if (!Number.isInteger(quantity)) {
        return 'A quantidade precisa ser um número do tipo inteiro';
    }

    return true;
}

module.exports = {
    validate
}