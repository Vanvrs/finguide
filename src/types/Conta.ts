import { Transacao } from "./Transacao.js";
import { Armazenador } from "./Armazenador.js";

export class Conta {
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>("transacoes") || [];

    //obtem saldo atual
    public getTransacoes(): Transacao[] {
        return this.transacoes;
    }

    //calculo do saldo
    public getSaldo(): number {
        return this.transacoes.reduce((acumulador, transacao) => {
            //Se for COMPRA, subtrai do saldo; se for VENDA, adiciona ao saldo
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
        //Adiciona a transação ao array
        this.transacoes.push(transacao);
        Armazenador.salvar("transacoes", this.transacoes);
        //atualização do saldo
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }

    public removerTransacao(id: string): void {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenador.salvar("transacoes", this.transacoes);
        document.dispatchEvent(new CustomEvent('saldo-atualizado'));
    }
} 

    