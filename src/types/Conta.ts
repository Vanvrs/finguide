import { Transacao } from "./Transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { Armazenador } from "./Armazenador.js";
import { TipoTransacao } from "./Transacao.js";

export class Conta {
    private transacoes: Transacao[] = [];
    private saldo: number = 0;

    constructor() {
        const transacoesSalvas = Armazenador.obter<Transacao[]>('transacoes');
        if (transacoesSalvas) {
            this.transacoes = transacoesSalvas;
            this.calcularSaldo();
        }
    }

    private calcularSaldo(): void {
        this.saldo = 0;
        this.transacoes.forEach(transacao => {
            if (transacao.tipoTransacao === TipoTransacao.COMPRA) {
                this.saldo -= transacao.valor * transacao.quantidade;
            } else {
                this.saldo += transacao.valor * transacao.quantidade;
            }
        });
    }

    public adicionarTransacao(novaTransacao: Transacao): void {
        this.transacoes.push(novaTransacao);
        if (novaTransacao.tipoTransacao === TipoTransacao.COMPRA) {
            this.saldo -= novaTransacao.valor * novaTransacao.quantidade;
        } else {
            this.saldo += novaTransacao.valor * novaTransacao.quantidade;
        }
        Armazenador.salvar('transacoes', this.transacoes);
    }

    public removerTransacao(id: number): void {
        const index = this.transacoes.findIndex(t => t.id === id);
        if (index !== -1) {
            const transacao = this.transacoes[index];
            if (transacao.tipoTransacao === TipoTransacao.COMPRA) {
                this.saldo += transacao.valor * transacao.quantidade;
            } else {
                this.saldo -= transacao.valor * transacao.quantidade;
            }
            this.transacoes.splice(index, 1);
            Armazenador.salvar('transacoes', this.transacoes);
        }
    }

    public getGruposTransacoes(): GrupoTransacao[] {
        const grupos: GrupoTransacao[] = [];
        let grupoAtual: GrupoTransacao | null = null;

        const transacoesOrdenadas = [...this.transacoes].sort((a, b) => 
            b.data.getTime() - a.data.getTime()
        );

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

    public getSaldo(): number {
        return this.saldo;
    }

    public getTransacaoPorId(id: number): Transacao | undefined {
        return this.transacoes.find(t => t.id === id);
    }
}