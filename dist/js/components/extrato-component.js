import { formatarMoeda } from "../utils/formatters.js";
export default class ExtratoComponent {
    constructor(conta) {
        const tabelaElement = document.querySelector('#listaTransacoes');
        const saldoElement = document.querySelector('#saldoTotal');
        if (!tabelaElement || !saldoElement) {
            throw new Error("Elementos do extrato não encontrados no DOM");
        }
        this.tabela = tabelaElement;
        this.saldoTotal = saldoElement;
        this.conta = conta;
        this.render();
        this.setupEventListeners();
    }
    render() {
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();
        if (transacoes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6">Nenhuma transação cadastrada</td>`;
            this.tabela.appendChild(row);
        }
        else {
            transacoes.forEach((transacao) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transacao.tipo === 'COMPRA' ? 'Compra' : 'Venda'}</td>
                    <td>${transacao.mercadoria}</td>
                    <td>${transacao.quantidade}</td>
                    <td>${formatarMoeda(transacao.valor)}</td>
                    <td>${formatarMoeda(transacao.total)}</td>
                    <td>
                        <button class="btn-remover" data-id="${transacao.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                this.tabela.appendChild(row);
            });
        }
        this.saldoTotal.textContent = formatarMoeda(this.conta.getSaldo());
    }
    setupEventListeners() {
        this.tabela.addEventListener('click', (event) => {
            const target = event.target;
            const btnRemover = target.closest('.btn-remover');
            if (btnRemover) {
                const transacaoId = btnRemover.getAttribute('data-id');
                if (transacaoId) {
                    if (confirm('Tem certeza que deseja remover esta transação?')) {
                        this.conta.removerTransacao(transacaoId);
                        this.render();
                    }
                }
            }
        });
        document.addEventListener('transacao-adicionada', () => {
            this.render();
        });
    }
}
