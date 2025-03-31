import { Conta } from "../types/Conta.js";

declare const bootstrap: any; //Declaração para o Bootstrap

export default class NovaTransacaoComponent {
    private form: HTMLFormElement;
    private conta: Conta;
    private adicionarModal: any;
    private confirmAddBtn: HTMLButtonElement;

    constructor(conta: Conta) {
        this.conta = conta;
        this.form = document.getElementById('formTransacao') as HTMLFormElement;
        
        // Inicializa o modal
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        
        this.confirmAddBtn = document.getElementById('confirmAdd') as HTMLButtonElement;
        
        if (!this.form || !modalElement || !this.confirmAddBtn) {
            throw new Error("Elementos não encontrados no DOM!");
        }

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.prepararConfirmacao();
        });

        this.confirmAddBtn.addEventListener('click', () => {
            this.adicionarTransacao();
            this.adicionarModal.hide();
        });
    }

    private prepararConfirmacao(): void {
        const tipo = (document.getElementById('tipoTransacao') as HTMLSelectElement).value;
        const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement).value;
        const quantidade = (document.getElementById('quantidade') as HTMLInputElement).value;
        const valor = (document.getElementById('valor') as HTMLInputElement).value;

        //Preenche o modal
        document.getElementById('modalItemAdicionar')!.textContent = mercadoria;
        document.getElementById('modalQuantidadeAdicionar')!.textContent = quantidade;
        document.getElementById('modalValorAdicionar')!.textContent = `R$ ${parseFloat(valor).toFixed(2)}`;

        //Mostra o modal
        this.adicionarModal.show();
    }

    private adicionarTransacao(): void {
        const tipo = (document.getElementById('tipoTransacao') as HTMLSelectElement).value as 'COMPRA' | 'VENDA';
        const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement).value;
        const quantidade = parseFloat((document.getElementById('quantidade') as HTMLInputElement).value);
        const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);

        if (!isNaN(valor) && !isNaN(quantidade) && mercadoria.trim() !== '') {
            this.conta.adicionarTransacao(tipo, valor, mercadoria, quantidade);
            this.form.reset();
            document.dispatchEvent(new CustomEvent('transacao-adicionada'));
        }
    }
}