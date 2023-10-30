const readline = require('readline-sync');

const makeText = async (texto) => {
    
    const regexEmail = /\b[\w\.-]+@[\w\.-]+\.\w+\b/g;
    const emailsEncontrados = texto.match(regexEmail);

    return emailsEncontrados || [];
}

module.exports = {
    makeText
}