import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

export class SaldoComponent {
    private elementoSaldoTotal: HTMLElement;
    private elementoSaldoHeader: HTMLElement;

    constructor(private conta: Conta) {
        this.elementoSaldoTotal = document.getElementById('saldoTotal') as HTMLElement;
        this.elementoSaldoHeader = document.getElementById('saldoHeader') as HTMLElement;
        
        this.atualizar();
        this.configurarEventListeners();
    }

    private configurarEventListeners(): void {
        document.addEventListener('transacao-adicionada', () => this.atualizar());
        document.addEventListener('transacao-removida', () => this.atualizar());
    }

    public atualizar(): void {
        const saldo = this.conta.getSaldo();
        const saldoFormatado = formatarMoeda(saldo);
        
        this.elementoSaldoTotal.textContent = saldoFormatado;
        this.elementoSaldoHeader.textContent = saldoFormatado;
        
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
        this.elementoSaldoTotal.className = classeCor;
        this.elementoSaldoHeader.className = classeCor;
    }
}