import { Transacao } from "../types/Transacao.js";
import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

declare const bootstrap: any; //Declaração para o Bootstrap globalmente para os modais funcionarem

export default class ExtratoComponent {
    private tabela: HTMLTableSectionElement;
    private saldoTotal: HTMLElement;
    private conta: Conta;
    private excluirModal: any;
    private confirmDeleteBtn: HTMLButtonElement;
    private transacaoParaExcluir: string | null = null;

    //inicializa modal de exclusão
    constructor(conta: Conta) {
        this.conta = conta;
        this.tabela = document.getElementById('listaTransacoes') as HTMLTableSectionElement;
        this.saldoTotal = document.getElementById('saldoTotal') as HTMLElement;
        
        //Inicialização do modal de  - ver com igor ao colocar # por ser id quebra o código
        const modalElement = document.getElementById('excluirModal');
        this.excluirModal = new bootstrap.Modal(modalElement);
        this.confirmDeleteBtn = document.getElementById('confirmDelete') as HTMLButtonElement;

        if (!this.tabela || !this.saldoTotal || !modalElement || !this.confirmDeleteBtn) {
            throw new Error("Elementos do extrato não encontrados");
        }

        this.render();
        this.setupEventListeners();
    }

    //Limpa e recria a tabela com as transações
    private render(): void {
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();

        if (transacoes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6">Nenhuma transação cadastrada</td>`;
            this.tabela.appendChild(row);
        } else {
            transacoes.forEach((transacao: Transacao) => {
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

    //clica no link da lixeira
    private setupEventListeners(): void {
        this.tabela.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const btnRemover = target.closest('.btn-remover');
            
            if (btnRemover) {
                const transacaoId = btnRemover.getAttribute('data-id');
                if (transacaoId) {
                    this.prepararExclusao(transacaoId);
                }
            }
        });

        //confirma deletação
        this.confirmDeleteBtn.addEventListener('click', () => {
            if (this.transacaoParaExcluir) {
                this.conta.removerTransacao(this.transacaoParaExcluir);
                this.render();
                this.excluirModal.hide();
                this.transacaoParaExcluir = null;
            }
        });
        //Atualiza quando nova transação é adicionada
        document.addEventListener('transacao-adicionada', () => {
            this.render();
        });
    }

    //encontra a transacao e preenche o modal, trazendo as informações por id.
    private prepararExclusao(transacaoId: string): void {
        const transacao = this.conta.getTransacoes().find(t => t.id === transacaoId);
        if (!transacao) return;

        this.transacaoParaExcluir = transacaoId;
        
        //Preenchimento do modal
        document.getElementById('modalItemExcluir')!.textContent = transacao.mercadoria;
        document.getElementById('modalQuantidadeExcluir')!.textContent = transacao.quantidade.toString();
        document.getElementById('modalValorExcluir')!.textContent = formatarMoeda(transacao.valor);

        //Visualização do modal
        this.excluirModal.show();
    }
}