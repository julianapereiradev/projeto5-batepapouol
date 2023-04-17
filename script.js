
let nomeUSuario = {
    name: ""
};
let textoMensagem;
let carrega;
let time;
let today;
let lista = [];
let scrollIntoView;
let rolarParaBaixo;

////(início do código): Bônus - Tela de entrada 
function verificarNome(buttonLoginEntrar) {
    const nome = document.querySelector(".nomeUSuario");
    const carregarGif = document.querySelector(".carregarGif");
    const loginEntrar = document.querySelector(".div-login-entrar");
    const nomeUSuarioErro = document.querySelector(".nomeUsuarioErro");

    nomeUSuario.name = nome.value;
    const promise = axios.post("https://mock-api.driven.com.br/api/vm/uol/participants", nomeUSuario);

    nome.classList.add("esconder");
    buttonLoginEntrar.classList.add("esconder");
    carregarGif.classList.remove("esconder");
    loginEntrar.classList.remove("esconder");
    nomeUSuarioErro.classList.add("esconder");
    

    promise.then(entradaSucesso);
    promise.catch(respostaEntradaErro);
}

function entradaSucesso() {
    const pagina = document.querySelector(".tela-entrada");
    pagina.classList.add("esconder");
    
    buscandoMsgs()
    setInterval(buscandoMsgs, 3000)
    setInterval(continuaOnline, 5000)

    addMensagemRenderizada()
}

function respostaEntradaErro() {
    const buttonLoginEntrar = document.querySelector(".buttonLogin");
    const nome = document.querySelector(".nomeUSuario");
    const carregarGif = document.querySelector(".carregarGif");
    const loginEntrar = document.querySelector(".div-login-entrar");
    const nomeUSuarioErro = document.querySelector(".nomeUsuarioErro");

    buttonLoginEntrar.classList.remove("esconder");
    nome.classList.remove("esconder");
    nomeUSuarioErro.classList.remove("esconder");
    carregarGif.classList.add("esconder");
    loginEntrar.classList.add("esconder");
}
////(fim do código): Bônus - Tela de entrada 




////(início do código): Obrigatório - Manter Conexão (status) 
function continuaOnline() {
   
    const promiseContinuaOnline = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/status',
       nomeUSuario
    )
    promiseContinuaOnline.then(continuaOnlineSucesso)
    promiseContinuaOnline.catch(continuaOnlineErro)
}

function continuaOnlineSucesso(respostaContinuaOnlineSucesso) {
    console.log('respostaContinuaOnlineSucesso aqui:', respostaContinuaOnlineSucesso)
}

function continuaOnlineErro(respostaContinuaOnlineErro) {
    console.log('respostaContinuaOnlineErro aqui:', respostaContinuaOnlineErro)
    carrega = window.location.reload()

}
////(fim do código): Obrigatório - Manter Conexão (status) 




////(início do código): Obrigatório - Buscar Mensagens 
function buscandoMsgs() {
    const promiseBuscandoMsgs = axios.get(
        'https://mock-api.driven.com.br/api/vm/uol/messages')
    promiseBuscandoMsgs.then(buscandoMsgsSucesso)
    promiseBuscandoMsgs.catch(buscandoMsgsErro)
}

function buscandoMsgsSucesso(respostaBuscandoMsgsSucesso) {
    console.log('respostaBuscandoMsgsSucesso aqui:', respostaBuscandoMsgsSucesso)
    
    lista = respostaBuscandoMsgsSucesso.data
    console.log('lista::', lista)

    addMensagemRenderizada()
}

function buscandoMsgsErro(respostaBuscandoMsgsErro) {
    console.log('respostaBuscandoMsgsErro aqui:', respostaBuscandoMsgsErro)
}
////(fim do código): Obrigatório - Buscar Mensagens 




////(início do código): Obrigatório - Enviar Mensagens 
function enviarMsg() {

    textoMensagem = document.querySelector(".texto-input").value

    const mensagemAEnviar = {
        from: nomeUSuario.name,
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

function sucessoNaMsgEnviada(respostaSucessoMsgEnviada) {
    console.log('respostaSucessoMsgEnviada aqui:', respostaSucessoMsgEnviada)
    const promiseReceberResposta = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promiseReceberResposta.then(respostaChegou)
}

function respostaChegou(responseReceberResposta) {
    lista = responseReceberResposta.data;
    addMensagemRenderizada()
}

function erroNaMsgEnviada(respostaEntradaErroMesgEnviada) {
    console.log('respostaEntradaErroMesgEnviada aqui:', respostaEntradaErroMesgEnviada)
    carrega = window.location.reload()
}
////(fim do código): Obrigatório - Enviar Mensagens 



////Código da mensagem que está renderizando na tela: 
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
            <div class="conteudo"><strong>${item.from}</strong> diz:</div>
            <div class="conteudo">${item.text}</div>
        </div>
    `
    }
    setTimeout(() => {rolarParaBaixo = elementoResposta.querySelectorAll('.mensagem');
        rolarParaBaixo[rolarParaBaixo.length - 1].scrollIntoView()}, 1000);
}