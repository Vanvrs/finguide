import { formatarMoeda } from "../utils/formatters.js";
//exibe e atualizar o saldo
export class SaldoComponent {
    //inicializa o componente
    constructor(conta) {
        this.conta = conta;
        this.elementoSaldoTotal = document.getElementById('saldoTotal');
        this.elementoSaldoHeader = document.getElementById('saldoHeader');
        //Atualiza os valores exibidos inicialmente e configura eventos
        this.atualizar();
        this.configurarEventListeners();
    }
    //Configura os eventos de atualiza��o
    configurarEventListeners() {
        //adicionar transa��o
        document.addEventListener('transacao-adicionada', () => this.atualizar());
        //Evento de remo��o transa��o
        document.addEventListener('transacao-removida', () => this.atualizar());
    }
    //Atualiza a exibi��o do saldo
    atualizar() {
        const saldo = this.conta.getSaldo();
        //Formata o valor para exibi��o monet�ria
        const saldoFormatado = formatarMoeda(saldo);
        //Atualiza o conte�do dos elementos com o saldo formatado
        this.elementoSaldoTotal.textContent = saldoFormatado;
        this.elementoSaldoHeader.textContent = saldoFormatado;
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.elementoSaldoTotal.className = classeCor;
        this.elementoSaldoHeader.className = classeCor;
    }
}
