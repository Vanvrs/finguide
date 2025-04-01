import { Transacao } from "./Transacao.js";
import { Armazenador } from "./Armazenador.js";

export class Conta {
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>("transacoes") || [];

    public getTransacoes(): Transacao[] {
        return this.transacoes;
    }

    public getSaldo(): number {
        return this.transacoes.reduce((acumulador, transacao) => {
            return transacao.tipo === 'COMPRA' 
                ? acumulador - transacao.total 
                : acumulador + transacao.total;
        }, 0);
    }

    public getTotalGeral(): number {
        return this.transacoes.reduce((total, transacao) => {
            return total + transacao.total;
        }, 0);
    }

    public adicionarTransacao(transacao: Transacao): void {
        this.transacoes.push(transacao);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }

    public removerTransacao(id: string): void {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
} 

    