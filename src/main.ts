/* import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";
import { formatarMoeda } from "./utils/formatters.js";

const conta = new Conta();

// Função para atualizar o extrato mobile
function atualizarExtratoMobile() {
    const transacoes = conta.getTransacoes();
    const tbody = document.getElementById('listaTransacoesMobile');
    const totalGeralMobile = document.getElementById('totalGeralMobile');
    const saldoHeaderMobile = document.getElementById('saldoHeaderMobile');

    tbody.innerHTML = '';

    if (transacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma transação cadastrada</td></tr>';
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
            tbody.appendChild(row);
        });
    }

    // Atualizar totais
    const totalGeral = conta.getTotalGeral();
    const saldo = conta.getSaldo();
    
    totalGeralMobile.textContent = formatarMoeda(totalGeral);
    saldoHeaderMobile.textContent = formatarMoeda(saldo);
    
    const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
    saldoHeaderMobile.className = classeCor;
}

try {
    new NovaTransacaoComponent(conta);
    new ExtratoComponent(conta);

    // Atualizar extrato mobile inicialmente
    atualizarExtratoMobile();

    // Controle de navegação mobile
    document.getElementById('btnVisualizarExtrato')?.addEventListener('click', () => {
        document.querySelector('.pagina-transacao')?.classList.add('d-none');
        document.querySelector('.pagina-extrato-mobile')?.classList.remove('d-none');
        atualizarExtratoMobile();
    });

    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => {
        document.querySelector('.pagina-extrato-mobile')?.classList.add('d-none');
        document.querySelector('.pagina-transacao')?.classList.remove('d-none');
    });

    // Ouvintes de eventos para atualizar ambos os extratos
    document.addEventListener('transacao-adicionada', () => {
        atualizarExtratoMobile();
    });

    document.addEventListener('transacao-removida', () => {
        atualizarExtratoMobile();
    });

} catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
} */

    import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";
import { formatarMoeda } from "./utils/formatters.js";
import { TipoTransacao } from "./types/TipoTransacao.js";

const conta = new Conta();

function atualizarExtratoMobile() {
    const transacoes = conta.getTransacoes();
    const tbody = document.getElementById('listaTransacoesMobile');
    const totalGeralMobile = document.getElementById('totalGeralMobile');
    const saldoHeaderMobile = document.getElementById('saldoHeaderMobile');

    tbody.innerHTML = '';

    if (transacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma transação cadastrada</td></tr>';
    } else {
        transacoes.forEach(transacao => {
            const sinalClasse = transacao.tipo === TipoTransacao.COMPRA ? 'text-danger' : 'text-success';
            const row = document.createElement('tr');
            
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

    const totalGeral = conta.getTotalGeral();
    const saldo = conta.getSaldo();
    
    totalGeralMobile.textContent = formatarMoeda(totalGeral);
    saldoHeaderMobile.textContent = formatarMoeda(saldo);
    
    const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
    saldoHeaderMobile.className = classeCor;
}

try {
    new NovaTransacaoComponent(conta);
    new ExtratoComponent(conta);

    atualizarExtratoMobile();

    document.getElementById('btnVisualizarExtrato')?.addEventListener('click', () => {
        document.querySelector('.pagina-transacao')?.classList.add('d-none');
        document.querySelector('.pagina-extrato-mobile')?.classList.remove('d-none');
        atualizarExtratoMobile();
    });

    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => {
        document.querySelector('.pagina-extrato-mobile')?.classList.add('d-none');
        document.querySelector('.pagina-transacao')?.classList.remove('d-none');
    });

    document.addEventListener('transacao-adicionada', () => {
        atualizarExtratoMobile();
    });

    document.addEventListener('transacao-removida', () => {
        atualizarExtratoMobile();
    });

} catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
}