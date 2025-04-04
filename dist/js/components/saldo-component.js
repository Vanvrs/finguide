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
    //Configura os eventos de atualização
    configurarEventListeners() {
        //adicionar transação
        document.addEventListener('transacao-adicionada', () => this.atualizar());
        //Evento de remoção transação
        document.addEventListener('transacao-removida', () => this.atualizar());
    }
    //Atualiza a exibição do saldo
    atualizar() {
        const saldo = this.conta.getSaldo();
        //Formata o valor para exibição monetária
        const saldoFormatado = formatarMoeda(saldo);
        //Atualiza o conteúdo dos elementos com o saldo formatado
        this.elementoSaldoTotal.textContent = saldoFormatado;
        this.elementoSaldoHeader.textContent = saldoFormatado;
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.elementoSaldoTotal.className = classeCor;
        this.elementoSaldoHeader.className = classeCor;
    }
}
