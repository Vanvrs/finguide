export default class NovaTransacaoComponent {
    constructor(conta) {
        const formElement = document.querySelector('#formTransacao');
        if (!formElement) {
            throw new Error("Formulário não encontrado no DOM");
        }
        this.form = formElement;
        this.conta = conta;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const tipo = this.form.querySelector('#tipoTransacao');
            const mercadoria = this.form.querySelector('#mercadoria');
            const quantidade = this.form.querySelector('#quantidade');
            const valor = this.form.querySelector('#valor');
            if (!tipo || !mercadoria || !quantidade || !valor) {
                alert("Elementos do formulário não encontrados!");
                return;
            }
            const tipoValue = tipo.value;
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
            }
            else {
                alert("Por favor, preencha todos os campos corretamente.");
            }
        });
    }
}
