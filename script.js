
axios.defaults.headers.common['Authorization'] = 'MpetnpJedREJPybUXjVJuTJE';

let nomeUSuario;
let textoMensagem;
let carrega;
let time
let today
let lista = []


//(início do commit): Entrada na sala

function entradaSucesso(respostaEntradaSucesso) {
    console.log('respostaEntradaSucesso aqui:', respostaEntradaSucesso)
    buscandoMsgs()
    setInterval(buscandoMsgs, 3000)
    setInterval(continuaOnline, 5000)
}

// function entradaErro(respostaEntradaErro) {
//     console.log('respostaEntradaErro aqui:', respostaEntradaErro)

//     verificarNome()
// }

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
    promiseNomeExiste.catch(verificarNome)
}
verificarNome()
//(fim do commit): Entrada na sala




//(início do commit): Manter conexão

// setInterval(continuaOnline, 5000)

function continuaOnlineSucesso(respostaContinuaOnlineSucesso) {
    console.log('respostaContinuaOnlineSucesso aqui:', respostaContinuaOnlineSucesso)
}

function continuaOnlineErro(respostaContinuaOnlineErro) {
    console.log('respostaContinuaOnlineErro aqui:', respostaContinuaOnlineErro)
    carrega = window.location.reload()
    
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

function buscandoMsgsSucesso(respostaBuscandoMsgsSucesso) {
    console.log('respostaBuscandoMsgsSucesso aqui:', respostaBuscandoMsgsSucesso)
    lista = respostaBuscandoMsgsSucesso.data
    console.log('lista', lista)
    addMensagemRenderizada()
}

function buscandoMsgsErro(respostaBuscandoMsgsErro) {
    console.log('respostaBuscandoMsgsErro aqui:', respostaBuscandoMsgsErro)
}

function buscandoMsgs() {
    const promiseBuscandoMsgs = axios.get(
        'https://mock-api.driven.com.br/api/vm/uol/messages')
    promiseBuscandoMsgs.then(buscandoMsgsSucesso)
    promiseBuscandoMsgs.catch(buscandoMsgsErro)
}
//(fim do commit): Buscar Mensagens




//(início do commit): Menesagem Enviada

function addMensagemRenderizada() {
    const elementoResposta = document.querySelector(".conversacao");
    elementoResposta.innerHTML = '';
    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    for (let i = 0; i < lista.length; i++) {
        let item = lista[i]
        elementoResposta.innerHTML += `
        <div class="mensagem" data-test="message">
            <div class="hora">(${item.time})</div>
            <div class="conteudo">${item.from} diz:</div>
            <div class="conteudo">${item.text}</div>
        </div>
    `
    }


}

function respostaChegou(responseReceberResposta) {
    lista = responseReceberResposta.data;
    addMensagemRenderizada()
}

function sucessoNaMsgEnviada(respostaSucessoMsgEnviada) {
    console.log(`A receita foi salva com sucesso com o id ${respostaSucessoMsgEnviada.data.id}!!`);
    // lista = JSON.parse(respostaSucessoMsgEnviada.config.data)
    // console.log(' lista como Objeto dataSucessoNaMsgEnviada:', lista)
    // addMensagemRenderizada()
    const promiseReceberResposta = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promiseReceberResposta.then(respostaChegou)
}

function erroNaMsgEnviada(respostaEntradaErroMesgEnviada) {
    console.log('respostaEntradaErroMesgEnviada aqui:', respostaEntradaErroMesgEnviada)
    carrega = window.location.reload()
}

function enviarMsg() {

    textoMensagem = document.querySelector(".texto-input").value

    const mensagemAEnviar = {
        from: nomeUSuario,
        to: "Todos",
        text: textoMensagem,
        type: "message",
    }

    const promiseEnviarMensagem = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/messages',
        mensagemAEnviar
    )
    promiseEnviarMensagem.then(sucessoNaMsgEnviada)
    promiseEnviarMensagem.catch(erroNaMsgEnviada)

    addMensagemRenderizada()
}
//(fim do commit): Menesagem Enviada
