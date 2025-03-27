import { Armazenador } from "./Armazenador.js";
import { TipoTransacao } from "./Transacao.js";
export class Conta {
    constructor() {
        this.transacoes = [];
        this.saldo = 0;
        const transacoesSalvas = Armazenador.obter('transacoes');
        if (transacoesSalvas) {
            this.transacoes = transacoesSalvas;
            this.calcularSaldo();
        }
    }
    calcularSaldo() {
        this.saldo = 0;
        this.transacoes.forEach(transacao => {
            if (transacao.tipoTransacao === TipoTransacao.COMPRA) {
                this.saldo -= transacao.valor * transacao.quantidade;
            }
            else {
                this.saldo += transacao.valor * transacao.quantidade;
            }
        });
    }
    adicionarTransacao(novaTransacao) {
        this.transacoes.push(novaTransacao);
        if (novaTransacao.tipoTransacao === TipoTransacao.COMPRA) {
            this.saldo -= novaTransacao.valor * novaTransacao.quantidade;
        }
        else {
            this.saldo += novaTransacao.valor * novaTransacao.quantidade;
        }
        Armazenador.salvar('transacoes', this.transacoes);
    }
    removerTransacao(id) {
        const index = this.transacoes.findIndex(t => t.id === id);
        if (index !== -1) {
            const transacao = this.transacoes[index];
            if (transacao.tipoTransacao === TipoTransacao.COMPRA) {
                this.saldo += transacao.valor * transacao.quantidade;
            }
            else {
                this.saldo -= transacao.valor * transacao.quantidade;
            }
            this.transacoes.splice(index, 1);
            Armazenador.salvar('transacoes', this.transacoes);
        }
    }
    getGruposTransacoes() {
        const grupos = [];
        let grupoAtual = null;
        const transacoesOrdenadas = [...this.transacoes].sort((a, b) => b.data.getTime() - a.data.getTime());
        transacoesOrdenadas.forEach(transacao => {
            const label = transacao.data.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric"
            });
            if (!grupoAtual || grupoAtual.label !== label) {
                grupoAtual = {
                    label,
                    transacoes: []
                };
                grupos.push(grupoAtual);
            }
            grupoAtual.transacoes.push(transacao);
        });
        return grupos;
    }
    getSaldo() {
        return this.saldo;
    }
    getTransacaoPorId(id) {
        return this.transacoes.find(t => t.id === id);
    }
}
