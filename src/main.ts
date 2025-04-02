import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";
import { formatarMoeda } from "./utils/formatters.js";
import { TipoTransacao } from "./types/TipoTransacao.js";

//instância da conta
const conta = new Conta();

//Função para atualizar o extrato na versão mobile
function atualizarExtratoMobile() {
    const transacoes = conta.getTransacoes();
    const tbody = document.getElementById('listaTransacoesMobile');
    const totalGeralMobile = document.getElementById('totalGeralMobile');
    const saldoHeaderMobile = document.getElementById('saldoHeaderMobile');

    //Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    //Verifica se há transações
    if (transacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma transação cadastrada</td></tr>';
    } else {
        //Para cada transação, cria uma linha na tabela
        transacoes.forEach(transacao => {
            //Define a classe  baseada no tipo de transação - vermelho ou verde
            const sinalClasse = transacao.tipo === TipoTransacao.COMPRA ? 'text-danger' : 'text-success';
            const row = document.createElement('tr');
            
            //Preenche a linha com os dados da transação
            row.innerHTML = `
                <td class="${sinalClasse}">${transacao.tipo === TipoTransacao.COMPRA ? '-' : '+'}</td>
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
            tbody.appendChild(row);
        });
    }

    //Atualiza os totais e saldo
    const totalGeral = conta.getTotalGeral();
    const saldo = conta.getSaldo();
    
    totalGeralMobile.textContent = formatarMoeda(totalGeral);
    saldoHeaderMobile.textContent = formatarMoeda(saldo);
    
    //Define a cor baseada no saldo
    const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
    saldoHeaderMobile.className = classeCor;
}


try {
    //Inicializa os componentes principais
    new NovaTransacaoComponent(conta);
    new ExtratoComponent(conta);

    //Atualiza o extrato mobile inicialmente
    atualizarExtratoMobile();

    //Configura eventos para alternância entre telas no mobile
    document.getElementById('btnVisualizarExtrato')?.addEventListener('click', () => {
        document.querySelector('.pagina-transacao')?.classList.add('d-none');
        document.querySelector('.pagina-extrato-mobile')?.classList.remove('d-none');
        atualizarExtratoMobile();
    });

    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => {
        document.querySelector('.pagina-extrato-mobile')?.classList.add('d-none');
        document.querySelector('.pagina-transacao')?.classList.remove('d-none');
    });

    //Configura eventos de atualização
    document.addEventListener('transacao-adicionada', () => {
        atualizarExtratoMobile();
    });

    document.addEventListener('transacao-removida', () => {
        atualizarExtratoMobile();
    });

} catch (error) {
    //Tratamento de erros na inicialização
    console.error('Erro ao inicializar a aplicação:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
}