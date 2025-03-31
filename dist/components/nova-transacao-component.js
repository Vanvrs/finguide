export default class NovaTransacaoComponent {
    constructor(conta) {
        this.conta = conta;
        this.form = document.getElementById('formTransacao');
        // Inicializa o modal
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        this.confirmAddBtn = document.getElementById('confirmAdd');
        if (!this.form || !modalElement || !this.confirmAddBtn) {
            throw new Error("Elementos não encontrados no DOM!");
        }
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.prepararConfirmacao();
        });
        this.confirmAddBtn.addEventListener('click', () => {
            this.adicionarTransacao();
            this.adicionarModal.hide();
        });
    }
    prepararConfirmacao() {
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value;
        const quantidade = document.getElementById('quantidade').value;
        const valor = document.getElementById('valor').value;
        //Preenche o modal
        document.getElementById('modalItemAdicionar').textContent = mercadoria;
        document.getElementById('modalQuantidadeAdicionar').textContent = quantidade;
        document.getElementById('modalValorAdicionar').textContent = `R$ ${parseFloat(valor).toFixed(2)}`;
        //Mostra o modal
        this.adicionarModal.show();
    }
    adicionarTransacao() {
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value;
        const quantidade = parseFloat(document.getElementById('quantidade').value);
        const valor = parseFloat(document.getElementById('valor').value);
        if (!isNaN(valor) && !isNaN(quantidade) && mercadoria.trim() !== '') {
            this.conta.adicionarTransacao(tipo, valor, mercadoria, quantidade);
            this.form.reset();
            document.dispatchEvent(new CustomEvent('transacao-adicionada'));
        }
    }
}
