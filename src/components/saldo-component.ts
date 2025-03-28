import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

export class SaldoComponent {
    private conta: Conta;
    private elementoSaldo: HTMLElement;

    constructor(conta: Conta) {
        this.conta = conta;
        
        const saldoElement = document.getElementById('#saldoTotal');
        if (!saldoElement) {
            throw new Error("Elemento 'saldoTotal' não encontrado no DOM!");
        }

        this.elementoSaldo = saldoElement;
        this.atualizar();
    }

    public atualizar(): void {
        try {
            this.elementoSaldo.textContent = formatarMoeda(this.conta.getSaldo());
        } catch (error) {
            console.error('Erro ao atualizar saldo:', error);
        }
    }
}