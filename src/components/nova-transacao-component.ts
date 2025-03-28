import { Conta } from "../types/Conta.js";

export default class NovaTransacaoComponent {
    private form: HTMLFormElement;
    private conta: Conta;

    constructor(conta: Conta) {
        const formElement = document.querySelector('#formTransacao') as HTMLFormElement;
        if (!formElement) {
            throw new Error("Formulário não encontrado no DOM");
        }

        this.form = formElement;
        this.conta = conta;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const tipo = this.form.querySelector('#tipoTransacao') as HTMLSelectElement;
            const mercadoria = this.form.querySelector('#mercadoria') as HTMLInputElement;
            const quantidade = this.form.querySelector('#quantidade') as HTMLInputElement;
            const valor = this.form.querySelector('#valor') as HTMLInputElement;

            if (!tipo || !mercadoria || !quantidade || !valor) {
                alert("Elementos do formulário não encontrados!");
                return;
            }

            const tipoValue = tipo.value as 'COMPRA' | 'VENDA';
            const mercadoriaValue = mercadoria.value;
            const quantidadeValue = parseFloat(quantidade.value);
            const valorValue = parseFloat(valor.value);

            if (!isNaN(valorValue) && !isNaN(quantidadeValue) && mercadoriaValue.trim() !== '') {
                this.conta.adicionarTransacao(tipoValue, valorValue, mercadoriaValue, quantidadeValue);
                this.form.reset();

                //Dispara evento para atualizar o extrato
                document.dispatchEvent(new CustomEvent('transacao-adicionada'));

                //Mostra mensagem de sucesso
                alert('Transação adicionada com sucesso!');
            } else {
                alert("Por favor, preencha todos os campos corretamente.");
            }
        });
    }
}