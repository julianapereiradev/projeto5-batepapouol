
axios.defaults.headers.common['Authorization'] = 'MpetnpJedREJPybUXjVJuTJE';

let nomeUSuario;
let textoMensagem;
let carrega;
let time
let today


//(início do commit): Entrada na sala

function entradaSucesso(respostaEntradaSucesso) {
    console.log('respostaEntradaSucesso aqui:', respostaEntradaSucesso)
}

function entradaErro(respostaEntradaErro) {
    console.log('respostaEntradaErro aqui:', respostaEntradaErro)

    verificarNome()
}

function verificarNome() {
    nomeUSuario = prompt('Qual é o seu nome?')

    const verificarNomeExiste = {
        name: nomeUSuario
    }

    const promiseNomeExiste = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/participants',
        verificarNomeExiste
    )
    promiseNomeExiste.then(entradaSucesso)
    promiseNomeExiste.catch(entradaErro)
}
verificarNome()
//(fim do commit): Entrada na sala




//(início do commit): Manter conexão

setInterval(continuaOnline, 5000)

function continuaOnlineSucesso(respostaContinuaOnlineSucesso) {
    console.log('respostaContinuaOnlineSucesso aqui:', respostaContinuaOnlineSucesso)
}

function continuaOnlineErro(respostaContinuaOnlineErro) {
    console.log('respostaContinuaOnlineErro aqui:', respostaContinuaOnlineErro)

    // verificarNome()
}

function continuaOnline() {
    const continuaOnlineExiste = {
        name: nomeUSuario
    }

    const promiseContinuaOnline = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/status',
        continuaOnlineExiste
    )
    promiseContinuaOnline.then(continuaOnlineSucesso)
    promiseContinuaOnline.catch(continuaOnlineErro)
}
//(fim do commit): Manter conexão




//(início do commit): Buscar Mensagens

setInterval(buscandoMsgs, 3000)

function buscandoMsgsSucesso(respostaBuscandoMsgsSucesso) {
    console.log('respostaBuscandoMsgsSucesso aqui:', respostaBuscandoMsgsSucesso)
}

function buscandoMsgsErro(respostaBuscandoMsgsErro) {
    console.log('respostaBuscandoMsgsErro aqui:', respostaBuscandoMsgsErro)
}

function buscandoMsgs() {
    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const buscandoMsgsExiste = [
            {
                from: nomeUSuario,
                to: "Todos", 
                text: textoMensagem, 
                type: "status",
                time: time
            },
            {
                from: nomeUSuario,
                to: "Todos",
                text: textoMensagem,
                type: "message",
                time: time
            },
    ]
    const promiseBuscandoMsgs = axios.get(
        'https://mock-api.driven.com.br/api/vm/uol/messages',
        buscandoMsgsExiste
    )
    promiseBuscandoMsgs.then(buscandoMsgsSucesso)
    promiseBuscandoMsgs.catch(buscandoMsgsErro)
}
//(fim do commit): Buscar Mensagens




//(início do commit): Menesagem Enviada

function addMensagemRenderizada() {
    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const elementoResposta = document.querySelector(".resposta-aqui");

    elementoResposta.innerHTML += `
        <div class="mensagem" data-test="message">
            <div class="hora">(${time})</div>
            <div class="conteudo">${nomeUSuario} diz:</div>
            <div class="conteudo">${textoMensagem}</div>
        </div>
    `
  }

function sucessoNaMsgEnviada(respostaSucessoMsgEnviada) {

    let dataSucessoNaMsgEnviada = JSON.parse(respostaSucessoMsgEnviada.config.data)
    console.log(' Objeto dataSucessoNaMsgEnviada:', dataSucessoNaMsgEnviada)
    
    addMensagemRenderizada(dataSucessoNaMsgEnviada)
}

function erroNaMsgEnviada(respostaEntradaErroMesgEnviada) {
    console.log('respostaEntradaErroMesgEnviada aqui:', respostaEntradaErroMesgEnviada)
    carrega = window.location.reload()
}

function enviarMsg() {

    textoMensagem = document.querySelector(".texto-input").value

    const mensagemAEnviar = {
        from: nomeUSuario,
        to: "(colocar Todos se não for um específico)", //ajeitar
        text: textoMensagem,
        type: "message", //ajeitar
    }

    const promiseEnviarMensagem = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/messages',
        mensagemAEnviar
    )
    promiseEnviarMensagem.then(sucessoNaMsgEnviada)
    promiseEnviarMensagem.catch(erroNaMsgEnviada)
}
//(fim do commit): Menesagem Enviada