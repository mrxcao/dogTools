
const makeText = async (texto) => {    
    const regexEmail = /\b[\w\.-]+@[\w\.-]+\.\w+\b/g;    
    const emailsEncontrados = texto.match(regexEmail);    
    let resposta = ''       
    if ( emailsEncontrados) {
    for (const o of emailsEncontrados) {        
        resposta = resposta+ `from .+\\${ o.substring(o.indexOf('@')).replace(/\./g,'\\.').trim()   }\n`
    }    
    }
    return resposta;
}

module.exports = {
    makeText
}