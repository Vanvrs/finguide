/* import { Transacao } from '../types/Transacao.js';
import { Conta } from '../types/Conta.js';

export class ExtratoComponent {
    private tabela: HTMLTableElement;
    private saldoTotal: HTMLElement;
    private conta: Conta;

    constructor(conta: Conta) {
        this.tabela = document.querySelector('#extrato-table') as HTMLTableElement;
        this.saldoTotal = document.querySelector('#saldo-total') as HTMLElement;
        this.conta = conta;
        this.render();
        this.setupEventListeners();
    }

    private render(): void {
        if (!this.tabela || !this.saldoTotal) return;

        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();

        transacoes.forEach((transacao: Transacao) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transacao.data.toLocaleDateString()}</td>
                <td>${transacao.tipo === 'COMPRA' ? 'Compra' : 'Venda'}</td>
                <td>${transacao.mercadoria}</td>
                <td>${transacao.quantidade}</td>
                <td>R$ ${transacao.valor.toFixed(2)}</td>
                <td>R$ ${transacao.total.toFixed(2)}</td>
                <td>
                    <button class="btn-remover" data-id="${transacao.id}">
                        Remover
                    </button>
                </td>
            `;
            this.tabela.appendChild(row);
        });

        this.saldoTotal.textContent = `R$ ${this.conta.getSaldo().toFixed(2)}`;
    }

    public atualizar(): void {
        this.render();
    }

    private setupEventListeners(): void {
        this.tabela?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('btn-remover')) {
                const transacaoId = target.getAttribute('data-id');
                if (transacaoId) {
                    this.conta.removerTransacao(transacaoId);
                    this.render();
                }
            }
        });
    }
}

export default ExtratoComponent;


 */
export default class ExtratoComponent {
    constructor(conta) {
        this.tabela = document.querySelector('#extrato-table');
        this.saldoTotal = document.querySelector('#saldo-total');
        this.conta = conta;
        this.render();
        this.setupEventListeners();
    }
    render() {
        if (!this.tabela || !this.saldoTotal)
            return;
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();
        if (transacoes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="7">Nenhuma transação cadastrada</td>`;
            this.tabela.appendChild(row);
        }
        else {
            transacoes.forEach((transacao) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(transacao.data).toLocaleDateString()}</td>
                    <td>${transacao.tipo === 'COMPRA' ? 'Compra' : 'Venda'}</td>
                    <td>${transacao.mercadoria}</td>
                    <td>${transacao.quantidade}</td>
                    <td>R$ ${transacao.valor.toFixed(2)}</td>
                    <td>R$ ${transacao.total.toFixed(2)}</td>
                    <td>
                        <button class="btn-remover" data-id="${transacao.id}">
                            Remover
                        </button>
                    </td>
                `;
                this.tabela.appendChild(row);
            });
        }
        this.saldoTotal.textContent = `R$ ${this.conta.getSaldo().toFixed(2)}`;
    }
    setupEventListeners() {
        // Listener para remoção de transações
        this.tabela.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('btn-remover')) {
                const transacaoId = target.getAttribute('data-id');
                if (transacaoId) {
                    this.conta.removerTransacao(transacaoId);
                    this.render();
                    alert('Transação removida com sucesso!');
                }
            }
        });
        // Listener para atualização quando nova transação é adicionada
        document.addEventListener('transacao-adicionada', () => {
            this.render();
        });
    }
}
