import { Transacao } from "../types/Transacao.js";
export class NovaTransacaoComponent {
    constructor(conta) {
        this.conta = conta;
        const formElement = document.getElementById('formTransacao');
        if (!formElement)
            throw new Error("Formulário não encontrado!");
        this.form = formElement;
        this.configurarEventos();
    }
    configurarEventos() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.adicionarTransacao();
        });
    }
    adicionarTransacao() {
        const tipoTransacao = document.getElementById('transactionType').value;
        const mercadoria = document.getElementById('mercadoria').value;
        const produto = document.getElementById('produto').value;
        const quantidadeInput = document.getElementById('quantidade');
        const valorInput = document.getElementById('valor');
        const quantidade = parseInt(quantidadeInput.value);
        const valor = parseFloat(valorInput.value);
        if (!mercadoria || !produto || isNaN(quantidade) || isNaN(valor)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }
        const novaTransacao = new Transacao(Date.now(), tipoTransacao, mercadoria, produto, quantidade, valor, new Date());
        this.conta.adicionarTransacao(novaTransacao);
        this.form.reset();
        window.location.href = 'extrato.html';
    }
}
/* https://meet.google.com/yas-qmod-wsk */ 
