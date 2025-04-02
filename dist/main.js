/* import { Conta } from "./types/Conta.js";
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
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma transa��o cadastrada</td></tr>';
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
    console.error('Erro ao inicializar a apli��o:', error);
    alert('Ocorreu um erro ao carregar a aplica��o. Por favor, recarregue a p�gina.');
} */
var _a, _b;
import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";
import { formatarMoeda } from "./utils/formatters.js";
import { TipoTransacao } from "./types/TipoTransacao.js";
//inst�ncia da conta
const conta = new Conta();
//Fun��o para atualizar o extrato na vers�o mobile
function atualizarExtratoMobile() {
    const transacoes = conta.getTransacoes();
    const tbody = document.getElementById('listaTransacoesMobile');
    const totalGeralMobile = document.getElementById('totalGeralMobile');
    const saldoHeaderMobile = document.getElementById('saldoHeaderMobile');
    //Limpa o conte�do atual da tabela
    tbody.innerHTML = '';
    //Verifica se h� transa��es
    if (transacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma transa��o cadastrada</td></tr>';
    }
    else {
        // Para cada transa��o, cria uma linha na tabela
        transacoes.forEach(transacao => {
            //Define a classe CSS baseada no tipo de transa��o
            const sinalClasse = transacao.tipo === TipoTransacao.COMPRA ? 'text-danger' : 'text-success';
            const row = document.createElement('tr');
            //Preenche a linha com os dados da transa��o
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
    //Configura eventos para altern�ncia entre telas no mobile
    (_a = document.getElementById('btnVisualizarExtrato')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        (_a = document.querySelector('.pagina-transacao')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        (_b = document.querySelector('.pagina-extrato-mobile')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
        atualizarExtratoMobile();
    });
    (_b = document.getElementById('btnNovaTransacao')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        var _a, _b;
        (_a = document.querySelector('.pagina-extrato-mobile')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        (_b = document.querySelector('.pagina-transacao')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
    });
    //Configura eventos de atualiza��o
    document.addEventListener('transacao-adicionada', () => {
        atualizarExtratoMobile();
    });
    document.addEventListener('transacao-removida', () => {
        atualizarExtratoMobile();
    });
}
catch (error) {
    //Tratamento de erros na inicializa��o
    console.error('Erro ao inicializar a aplica��o:', error);
    alert('Ocorreu um erro ao carregar a aplica��o. Por favor, recarregue a p�gina.');
}
