import { formatarMoeda } from "../utils/formatters.js";
// Classe principal do componente de extrato
export default class ExtratoComponent {
    // Construtor - inicializa o componente
    constructor(conta) {
        this.transacaoParaExcluir = null; // ID da transa��o a ser exclu�da
        this.conta = conta; // Recebe a conta como par�metro
        // Obt�m refer�ncias aos elementos do DOM
        this.tabela = document.getElementById('listaTransacoes');
        this.totalGeral = document.getElementById('totalGeral');
        this.saldoHeader = document.getElementById('saldoHeader');
        // Configura o modal de exclus�o usando Bootstrap
        const modalElement = document.getElementById('excluirModal');
        this.excluirModal = new bootstrap.Modal(modalElement);
        this.confirmDeleteBtn = document.getElementById('confirmDelete');
        // Renderiza o componente inicialmente
        this.render();
        // Configura os listeners de eventos
        this.setupEventListeners();
    }
    // Agrupa transa��es por data para exibi��o organizada
    agruparTransacoes() {
        const transacoes = this.conta.getTransacoes();
        const grupos = [];
        // Ordena transa��es por data (mais recente primeiro)
        const transacoesOrdenadas = [...transacoes].sort((a, b) => b.data.getTime() - a.data.getTime());
        // Agrupa transa��es pela mesma data
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
    /*  //Formata datas conforme o padr�o especificado
     private formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
         if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
             return data.toLocaleDateString('pt-BR', {
                 weekday: 'long',
                 day: '2-digit',
                 month: '2-digit',
                 year: 'numeric'
             });
         } else if (formato === FormatoData.DIA_MES) {
             return data.toLocaleDateString('pt-BR', {
                 day: '2-digit',
                 month: '2-digit'
             });
         }
 
         return data.toLocaleDateString('pt-BR');
     }
  */
    //Renderiza o componente na tela
    render() {
        //Limpa a tabela
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getTransacoes();
        //Se n�o houver transa��es, exibe mensagem
        if (transacoes.length === 0) {
            this.tabela.innerHTML = `<tr><td colspan="6">Nenhuma transa��o cadastrada</td></tr>`;
        }
        else {
            //Para cada transa��o, cria uma linha na tabela
            transacoes.forEach(transacao => {
                //Define classe CSS baseada no tipo (COMPRA = negativo, outros = positivo)
                const sinalClasse = transacao.tipo === 'COMPRA' ? 'text-danger' : 'text-success';
                const row = document.createElement('tr');
                //Preenche a linha com os dados da transa��o
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
    //Atualiza os valores totais e saldo no cabe�alho
    atualizarTotais() {
        const totalGeral = this.conta.getTotalGeral();
        const saldo = this.conta.getSaldo();
        // Formata e exibe os valores
        this.totalGeral.textContent = formatarMoeda(totalGeral);
        this.saldoHeader.textContent = formatarMoeda(saldo);
        // Muda a cor conforme o saldo (positivo/negativo)
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.saldoHeader.className = classeCor;
    }
    setupEventListeners() {
        //evento para remo��o)
        this.tabela.addEventListener('click', (event) => {
            const btnRemover = event.target.closest('.btn-remover');
            if (btnRemover) {
                this.prepararExclusao(btnRemover.getAttribute('data-id'));
            }
        });
        //Bot�o de confirma��o no modal de exclus�o
        this.confirmDeleteBtn.addEventListener('click', () => {
            if (this.transacaoParaExcluir) {
                //Remove a transa��o e atualiza a exibi��o
                this.conta.removerTransacao(this.transacaoParaExcluir);
                this.render();
                this.excluirModal.hide();
                //Dispara evento para notificar outros componentes
                document.dispatchEvent(new CustomEvent('transacao-removida'));
            }
        });
        //eventos globais de atualiza��o
        document.addEventListener('transacao-adicionada', () => this.render());
        document.addEventListener('transacao-removida', () => this.render());
    }
    //prepara��o a exclus�o mostrando os dados no modal
    prepararExclusao(id) {
        const transacao = this.conta.getTransacoes().find(t => t.id === id);
        if (!transacao)
            return;
        //Armazena o ID e preenche o modal com os dados
        this.transacaoParaExcluir = id;
        document.getElementById('modalItemExcluir').textContent = transacao.mercadoria;
        document.getElementById('modalQuantidadeExcluir').textContent = transacao.quantidade.toString();
        document.getElementById('modalValorExcluir').textContent = formatarMoeda(transacao.valor);
        this.excluirModal.show();
    }
}
