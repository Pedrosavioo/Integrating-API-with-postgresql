async function validCreateUser(username, password, email) {
    
    if (!username) {
        return 'Username precisa ser informado!'
    }

    if (!password) {
        return 'Password precisa ser informado!'
    }

    if (!email) {
        return 'Email precisa ser informado!'
    }

    return true;
} 

module.exports = {
    validCreateUser
}