/* import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

declare const bootstrap: any;

export default class ExtratoComponent {
    private tabela: HTMLTableSectionElement;
    private totalGeral: HTMLElement;
    private saldoHeader: HTMLElement;
    private conta: Conta;
    private excluirModal: any;
    private confirmDeleteBtn: HTMLButtonElement;
    private transacaoParaExcluir: string | null = null;

    constructor(conta: Conta) {
        this.conta = conta;
        this.tabela = document.getElementById('listaTransacoes') as HTMLTableSectionElement;
        this.totalGeral = document.getElementById('totalGeral') as HTMLElement;
        this.saldoHeader = document.getElementById('saldoHeader') as HTMLElement;
        
        const modalElement = document.getElementById('excluirModal');
        this.excluirModal = new bootstrap.Modal(modalElement);
        this.confirmDeleteBtn = document.getElementById('confirmDelete') as HTMLButtonElement;

        this.render();
        this.setupEventListeners();
    }

    private render(): void {
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();

        if (transacoes.length === 0) {
            this.tabela.innerHTML = `<tr><td colspan="6">Nenhuma transação cadastrada</td></tr>`;
        } else {
            transacoes.forEach(transacao => {
                const sinalClasse = transacao.tipo === 'COMPRA' ? 'text-danger' : 'text-success';
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td class="${sinalClasse}">${transacao.tipo === 'COMPRA' ? '-' : '+'}</td>
                    <td class="limitado" title="${transacao.mercadoria}">${transacao.mercadoria}</td>
                    <td>${transacao.quantidade}</td>
                    <td>${formatarMoeda(transacao.valor)}</td>
                    <td>${formatarMoeda(transacao.total)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-remover" data-id="${transacao.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                this.tabela.appendChild(row);
            });
        }

        this.atualizarTotais();
    }

    private atualizarTotais(): void {
        const totalGeral = this.conta.getTotalGeral();
        const saldo = this.conta.getSaldo();
        
        this.totalGeral.textContent = formatarMoeda(totalGeral);
        this.saldoHeader.textContent = formatarMoeda(saldo);
        
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.saldoHeader.className = classeCor;
    }

    private setupEventListeners(): void {
        this.tabela.addEventListener('click', (event) => {
            const btnRemover = (event.target as HTMLElement).closest('.btn-remover');
            if (btnRemover) {
                this.prepararExclusao(btnRemover.getAttribute('data-id')!);
            }
        });

        this.confirmDeleteBtn.addEventListener('click', () => {
            if (this.transacaoParaExcluir) {
                this.conta.removerTransacao(this.transacaoParaExcluir);
                this.render();
                this.excluirModal.hide();
                document.dispatchEvent(new CustomEvent('transacao-removida'));
            }
        });

        document.addEventListener('transacao-adicionada', () => this.render());
        document.addEventListener('transacao-removida', () => this.render());
    }

    private prepararExclusao(id: string): void {
        const transacao = this.conta.getTransacoes().find(t => t.id === id);
        if (!transacao) return;

        this.transacaoParaExcluir = id;
        document.getElementById('modalItemExcluir')!.textContent = transacao.mercadoria;
        document.getElementById('modalQuantidadeExcluir')!.textContent = transacao.quantidade.toString();
        document.getElementById('modalValorExcluir')!.textContent = formatarMoeda(transacao.valor);
        this.excluirModal.show();
    }
} */
import { formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
export default class ExtratoComponent {
    constructor(conta) {
        this.transacaoParaExcluir = null;
        this.conta = conta;
        this.tabela = document.getElementById('listaTransacoes');
        this.totalGeral = document.getElementById('totalGeral');
        this.saldoHeader = document.getElementById('saldoHeader');
        const modalElement = document.getElementById('excluirModal');
        this.excluirModal = new bootstrap.Modal(modalElement);
        this.confirmDeleteBtn = document.getElementById('confirmDelete');
        this.render();
        this.setupEventListeners();
    }
    agruparTransacoes() {
        const transacoes = this.conta.getTransacoes();
        const grupos = [];
        const transacoesOrdenadas = [...transacoes].sort((a, b) => b.data.getTime() - a.data.getTime());
        for (const transacao of transacoesOrdenadas) {
            const dataTransacao = transacao.data.toDateString();
            const grupoExistente = grupos.find(grupo => grupo.label === dataTransacao);
            if (grupoExistente) {
                grupoExistente.transacoes.push(transacao);
            }
            else {
                grupos.push({
                    label: dataTransacao,
                    transacoes: [transacao]
                });
            }
        }
        return grupos;
    }
    formatarData(data, formato = FormatoData.PADRAO) {
        if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
            return data.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        else if (formato === FormatoData.DIA_MES) {
            return data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit'
            });
        }
        return data.toLocaleDateString('pt-BR');
    }
    render() {
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();
        if (transacoes.length === 0) {
            this.tabela.innerHTML = `<tr><td colspan="6">Nenhuma transação cadastrada</td></tr>`;
        }
        else {
            transacoes.forEach(transacao => {
                const sinalClasse = transacao.tipo === 'COMPRA' ? 'text-danger' : 'text-success';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="${sinalClasse}">${transacao.tipo === 'COMPRA' ? '-' : '+'}</td>
                    <td class="limitado" title="${transacao.mercadoria}">${transacao.mercadoria}</td>
                    <td>${transacao.quantidade}</td>
                    <td>${formatarMoeda(transacao.valor)}</td>
                    <td>${formatarMoeda(transacao.total)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-remover" data-id="${transacao.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                this.tabela.appendChild(row);
            });
        }
        this.atualizarTotais();
    }
    atualizarTotais() {
        const totalGeral = this.conta.getTotalGeral();
        const saldo = this.conta.getSaldo();
        this.totalGeral.textContent = formatarMoeda(totalGeral);
        this.saldoHeader.textContent = formatarMoeda(saldo);
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.saldoHeader.className = classeCor;
    }
    setupEventListeners() {
        this.tabela.addEventListener('click', (event) => {
            const btnRemover = event.target.closest('.btn-remover');
            if (btnRemover) {
                this.prepararExclusao(btnRemover.getAttribute('data-id'));
            }
        });
        this.confirmDeleteBtn.addEventListener('click', () => {
            if (this.transacaoParaExcluir) {
                this.conta.removerTransacao(this.transacaoParaExcluir);
                this.render();
                this.excluirModal.hide();
                document.dispatchEvent(new CustomEvent('transacao-removida'));
            }
        });
        document.addEventListener('transacao-adicionada', () => this.render());
        document.addEventListener('transacao-removida', () => this.render());
    }
    prepararExclusao(id) {
        const transacao = this.conta.getTransacoes().find(t => t.id === id);
        if (!transacao)
            return;
        this.transacaoParaExcluir = id;
        document.getElementById('modalItemExcluir').textContent = transacao.mercadoria;
        document.getElementById('modalQuantidadeExcluir').textContent = transacao.quantidade.toString();
        document.getElementById('modalValorExcluir').textContent = formatarMoeda(transacao.valor);
        this.excluirModal.show();
    }
}
