import { formatarMoeda } from "../utils/formatters.js";
export class SaldoComponent {
    constructor(conta) {
        this.conta = conta;
        const saldoElement = document.getElementById('saldoTotal');
        if (!saldoElement) {
            throw new Error("Elemento 'saldoTotal' não encontrado no DOM!");
        }
        this.elementoSaldo = saldoElement;
        this.atualizar();
    }
    atualizar() {
        try {
            this.elementoSaldo.textContent = formatarMoeda(this.conta.getSaldo());
        }
        catch (error) {
            console.error('Erro ao atualizar saldo:', error);
        }
    }
}
