import { Transacao } from "./Transacao.js";
export class Conta {
    constructor() {
        this.transacoes = [];
        this.carregarTransacoes();
    }
    adicionarTransacao(tipo, valor, mercadoria, quantidade) {
        const transacao = new Transacao(tipo, mercadoria, quantidade, valor);
        this.transacoes.push(transacao);
        this.salvarTransacoes();
    }
    removerTransacao(id) {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        this.salvarTransacoes();
    }
    getTransacoes() {
        return [...this.transacoes];
    }
    getSaldo() {
        return this.transacoes.reduce((total, t) => {
            return t.tipo === 'COMPRA' ? total - t.total : total + t.total;
        }, 0);
    }
    salvarTransacoes() {
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
    }
    carregarTransacoes() {
        const transacoesSalvas = localStorage.getItem('transacoes');
        if (transacoesSalvas) {
            const transacoesParsed = JSON.parse(transacoesSalvas);
            this.transacoes = transacoesParsed.map((t) => new Transacao(t.tipo, t.mercadoria, t.quantidade, t.valor, new Date(t.data)));
        }
    }
}
