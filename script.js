
axios.defaults.headers.common['Authorization'] = 'MpetnpJedREJPybUXjVJuTJE';

let nomeUSuario;
let textoMensagem;


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
    ///// verificarNome()
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




//(início do commit): Menesagem Enviada

function addMensagemRenderizada() {

    const elementoResposta = document.querySelector(".resposta-aqui");

    elementoResposta.innerHTML += `
        <div class="mensagem">
            <div class="hora">(08:34:27)</div>
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
}

function enviarMsg() {

    textoMensagem = document.querySelector(".texto-input").value

    const mensagemAEnviar = {
        from: nomeUSuario,
        to: "nome do destinatário (Todos se não for um específico)",
        text: textoMensagem,
        type: "message",
    }

    const promiseEnviarMensagem = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/messages',
        mensagemAEnviar
    )
    promiseEnviarMensagem.then(sucessoNaMsgEnviada)
    promiseEnviarMensagem.catch(erroNaMsgEnviada)
}
//(fim do commit): Menesagem Enviada