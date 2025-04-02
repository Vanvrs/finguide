import { Armazenador } from "./Armazenador.js";
export class Conta {
    constructor() {
        this.transacoes = Armazenador.obter("transacoes") || [];
    }
    //obtem saldo atual
    getTransacoes() {
        return this.transacoes;
    }
    //calculo do saldo
    getSaldo() {
        return this.transacoes.reduce((acumulador, transacao) => {
            //Se for COMPRA, subtrai do saldo; se for VENDA, adiciona ao saldo
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
        //Adiciona a transa��o ao array
        this.transacoes.push(transacao);
        Armazenador.salvar("transacoes", this.transacoes);
        //atualiza��o do saldo
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
    removerTransacao(id) {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
}
