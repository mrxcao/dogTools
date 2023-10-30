const readline = require('readline-sync');
const boxTrap = require("./modules/boxTrape")

const start  = async () => {
    console.log("opções: \n"
    ,1, "formatar texto boxTrap")    
    const opt = readline.question('===>: ');    
    let resp
    switch (  parseInt(opt)) {
        case 1:
            const texto = readline.question('Cole o texto: ');    
            resp = await boxTrap.makeText(texto)
            console.log('resp',resp);
            break;
        default:
            break;
    }
    console.log('Resp: \n\n',resp, '\n\n');
    
}

start()
