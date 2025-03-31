import { Transacao } from "./Transacao.js";

export class Conta {
    private transacoes: Transacao[] = [];

    constructor() {
        this.carregarTransacoes();
    }

    public adicionarTransacao(tipo: 'COMPRA' | 'VENDA', valor: number, mercadoria: string, quantidade: number): void {
        const transacao = new Transacao(tipo, mercadoria, quantidade, valor);
        this.transacoes.push(transacao);
        this.salvarTransacoes();
    }

    public removerTransacao(id: string): void {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        this.salvarTransacoes();
    }

    public getTransacoes(): Transacao[] {
        return [...this.transacoes];
    }

    public getSaldo(): number {
        return this.transacoes.reduce((total, t) => {
            return t.tipo === 'COMPRA' ? total - t.total : total + t.total;
        }, 0);
    }

    private salvarTransacoes(): void {
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
    }

    private carregarTransacoes(): void {
        const transacoesSalvas = localStorage.getItem('transacoes');
        if (transacoesSalvas) {
            const transacoesParsed = JSON.parse(transacoesSalvas);
            this.transacoes = transacoesParsed.map((t: any) => new Transacao(
                t.tipo,
                t.mercadoria,
                t.quantidade,
                t.valor,
                new Date(t.data)
            ));
        }
    }
}

   