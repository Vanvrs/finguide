/* import { Conta } from "../types/Conta.js";

export class NovaTransacaoComponent {
    private form: HTMLFormElement;
    private conta: Conta;

    constructor(conta: Conta) {
        this.form = document.querySelector('#transacao-form') as HTMLFormElement;
        this.conta = conta;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.form?.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const tipo = (this.form.querySelector('#tipo') as HTMLSelectElement).value as 'COMPRA' | 'VENDA';
            const mercadoria = (this.form.querySelector('#mercadoria') as HTMLInputElement).value;
            const quantidade = parseFloat((this.form.querySelector('#quantidade') as HTMLInputElement).value);
            const valor = parseFloat((this.form.querySelector('#valor') as HTMLInputElement).value);

            if (!isNaN(valor) && !isNaN(quantidade)) {  // Corrigido aqui - parêntese fechado
                this.conta.adicionarTransacao(tipo, valor, mercadoria, quantidade);
                this.form.reset();
            } else {
                alert("Por favor, insira valores válidos para quantidade e valor.");
            }
        });
    }
}

export default NovaTransacaoComponent; */
export default class NovaTransacaoComponent {
    constructor(conta) {
        this.form = document.querySelector('#transacao-form');
        this.conta = conta;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const tipo = this.form.querySelector('#tipo').value;
            const mercadoria = this.form.querySelector('#mercadoria').value;
            const quantidade = parseFloat(this.form.querySelector('#quantidade').value);
            const valor = parseFloat(this.form.querySelector('#valor').value);
            if (!isNaN(valor) && !isNaN(quantidade) && mercadoria.trim() !== '') {
                this.conta.adicionarTransacao(tipo, valor, mercadoria, quantidade);
                this.form.reset();
                alert('Transação adicionada com sucesso!');
                // Dispara evento para atualizar o extrato
                document.dispatchEvent(new CustomEvent('transacao-adicionada'));
            }
            else {
                alert("Por favor, preencha todos os campos corretamente.");
            }
        });
    }
}
