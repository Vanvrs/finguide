import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { FormatoData } from "../types/FormatoData.js";

//Declara��o do Bootstrap (usado para modais)
declare const bootstrap: any;

//Classe principal do componente de extrato
export default class ExtratoComponent {
    
    private tabela: HTMLTableSectionElement;
    private totalGeral: HTMLElement;
    private saldoHeader: HTMLElement;
    private conta: Conta;
    private excluirModal: any;
    private confirmDeleteBtn: HTMLButtonElement;
    private transacaoParaExcluir: string | null = null;

    //inicializa o componente
    constructor(conta: Conta) {
        this.conta = conta; //Recebe a conta como par�metro

        this.tabela = document.getElementById('listaTransacoes') as HTMLTableSectionElement;
        this.totalGeral = document.getElementById('totalGeral') as HTMLElement;
        this.saldoHeader = document.getElementById('saldoHeader') as HTMLElement;

        //Configura o modal de exclus�o usando Bootstrap
        const modalElement = document.getElementById('excluirModal');
        this.excluirModal = new bootstrap.Modal(modalElement);
        this.confirmDeleteBtn = document.getElementById('confirmDelete') as HTMLButtonElement;

        //Renderiza o componente inicialmente
        this.render();
        this.setupEventListeners();
    }

    //Agrupa transa��es por data para exibi��o organizada
    private agruparTransacoes(): GrupoTransacao[] {
        const transacoes = this.conta.getTransacoes();
        const grupos: GrupoTransacao[] = [];
        //Ordena transa��es por data
        const transacoesOrdenadas = [...transacoes].sort((a, b) => b.data.getTime() - a.data.getTime());

        //Agrupa transa��es pela mesma data
        for (const transacao of transacoesOrdenadas) {
            const dataTransacao = transacao.data.toDateString();
            const grupoExistente = grupos.find(grupo => grupo.label === dataTransacao);

            if (grupoExistente) {
                grupoExistente.transacoes.push(transacao);
            } else {
                grupos.push({
                    label: dataTransacao,
                    transacoes: [transacao]
                });
            }
        }

        return grupos;
    }
    //Renderiza o componente na tela
    private render(): void {
        //Limpa a tabela
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();

        //Se não houver transações, exibe mensagem
        if (transacoes.length === 0) {
            this.tabela.innerHTML = `<tr><td colspan="6">Nenhuma transa��o cadastrada</td></tr>`;
        } else {
            //Para cada transão, cria uma linha na tabela
            transacoes.forEach(transacao => {
                //Define classe baseada no tipo (COMPRA = negativo, outros = positivo)
                const sinalClasse = transacao.tipo === 'COMPRA' ? 'text-danger' : 'text-success';
                const row = document.createElement('tr');

                //Preenche a linha com os dados da transação
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

        //Atualiza os totais e saldo
        this.atualizarTotais();
    }

    //Atualiza os valores totais e saldo
    private atualizarTotais(): void {
        const totalGeral = this.conta.getTotalGeral();
        const saldo = this.conta.getSaldo();

        //Formata e exibe os valores
        this.totalGeral.textContent = formatarMoeda(totalGeral);
        this.saldoHeader.textContent = formatarMoeda(saldo);

        //Muda a cor conforme o saldo (positivo/negativo)
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.saldoHeader.className = classeCor;
    }

    private setupEventListeners(): void {
        //evento para remoção
        this.tabela.addEventListener('click', (event) => {
            const btnRemover = (event.target as HTMLElement).closest('.btn-remover');
            if (btnRemover) {
                this.prepararExclusao(btnRemover.getAttribute('data-id')!);
            }
        });

        //Botão de confirmação no modal de exclusão
        this.confirmDeleteBtn.addEventListener('click', () => {
            if (this.transacaoParaExcluir) {
                //Remove a transaçãoo e atualiza a exibiçãoo
                this.conta.removerTransacao(this.transacaoParaExcluir);
                this.render();
                this.excluirModal.hide();
                //Dispara evento para notificar outros componentes
                document.dispatchEvent(new CustomEvent('transacao-removida'));
            }
        });

        //eventos globais de atualização
        document.addEventListener('transacao-adicionada', () => this.render());
        document.addEventListener('transacao-removida', () => this.render());
    }

    //preparação a exclusão mostrando os dados no modal
    private prepararExclusao(id: string): void {
        const transacao = this.conta.getTransacoes().find(t => t.id === id);
        if (!transacao) return;

        //Armazena o ID e preenche o modal com os dados
        this.transacaoParaExcluir = id;
        document.getElementById('modalItemExcluir')!.textContent = transacao.mercadoria;
        document.getElementById('modalQuantidadeExcluir')!.textContent = transacao.quantidade.toString();
        document.getElementById('modalValorExcluir')!.textContent = formatarMoeda(transacao.valor);
        this.excluirModal.show();
    }
}