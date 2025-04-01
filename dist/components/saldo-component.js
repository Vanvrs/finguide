import { formatarMoeda } from "../utils/formatters.js";
export class SaldoComponent {
    constructor(conta) {
        this.conta = conta;
        this.elementoSaldoTotal = document.getElementById('saldoTotal');
        this.elementoSaldoHeader = document.getElementById('saldoHeader');
        this.atualizar();
        this.configurarEventListeners();
    }
    configurarEventListeners() {
        document.addEventListener('transacao-adicionada', () => this.atualizar());
        document.addEventListener('transacao-removida', () => this.atualizar());
    }
    atualizar() {
        const saldo = this.conta.getSaldo();
        const saldoFormatado = formatarMoeda(saldo);
        this.elementoSaldoTotal.textContent = saldoFormatado;
        this.elementoSaldoHeader.textContent = saldoFormatado;
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.elementoSaldoTotal.className = classeCor;
        this.elementoSaldoHeader.className = classeCor;
    }
}
