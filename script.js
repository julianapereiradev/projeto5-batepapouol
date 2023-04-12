
axios.defaults.headers.common['Authorization'] = 'MpetnpJedREJPybUXjVJuTJE';

let nomeUSuario;

function sucesso(respostaSucesso) {
    console.log('respostaSucesso aqui:', respostaSucesso)
    console.log('respostaSucesso.status', respostaSucesso.status)
    console.log('o que eu enviei no sucesso:', nomeUSuario)
}

function erro(respostaErro) {
    console.log('respostaErro aqui:', respostaErro)
    console.log('respostaErro.status', respostaErro.response.status)
    console.log('o que eu enviei no erro:', nomeUSuario)    
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
    promiseNomeExiste.then(sucesso)
    promiseNomeExiste.catch(erro)
}
verificarNome()
