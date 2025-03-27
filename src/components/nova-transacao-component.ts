import { Conta } from "../types/Conta.js";
import { Transacao, TipoTransacao } from "../types/Transacao.js";


export class NovaTransacaoComponent {
    private form: HTMLFormElement;
    private conta: Conta;

    constructor(conta: Conta) {
        this.conta = conta;
        const formElement = document.getElementById('formTransacao');
        if (!formElement) throw new Error("Formulário não encontrado!");
        this.form = formElement as HTMLFormElement;
        this.configurarEventos();
    }

    private configurarEventos(): void {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.adicionarTransacao();
        });
    }

    private adicionarTransacao(): void {
        const tipoTransacao = (document.getElementById('transactionType') as HTMLSelectElement).value as TipoTransacao;
        const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement).value;
        const produto = (document.getElementById('produto') as HTMLInputElement).value;
        const quantidadeInput = document.getElementById('quantidade') as HTMLInputElement;
        const valorInput = document.getElementById('valor') as HTMLInputElement;

        const quantidade = parseInt(quantidadeInput.value);
        const valor = parseFloat(valorInput.value);

        if (!mercadoria || !produto || isNaN(quantidade) || isNaN(valor)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const novaTransacao = new Transacao(
            Date.now(),
            tipoTransacao,
            mercadoria,
            produto,
            quantidade,
            valor,
            new Date()
        );

        this.conta.adicionarTransacao(novaTransacao);
        this.form.reset();
        
        window.location.href = 'extrato.html';
    }
}
/* https://meet.google.com/yas-qmod-wsk */