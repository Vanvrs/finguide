import { Armazenador } from "./Armazenador.js";
export class Conta {
    constructor() {
        this.transacoes = Armazenador.obter("transacoes") || [];
    }
    getTransacoes() {
        return this.transacoes;
    }
    getSaldo() {
        return this.transacoes.reduce((acumulador, transacao) => {
            return transacao.tipo === 'COMPRA'
                ? acumulador - transacao.total
                : acumulador + transacao.total;
        }, 0);
    }
    getTotalGeral() {
        return this.transacoes.reduce((total, transacao) => {
            return total + transacao.total;
        }, 0);
    }
    adicionarTransacao(transacao) {
        this.transacoes.push(transacao);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
    removerTransacao(id) {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
}
