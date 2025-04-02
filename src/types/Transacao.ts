import { TipoTransacao } from "./TipoTransacao.js";

export class Transacao {
    public id: string; //essa propriedade armazena um ID único para a transação

    constructor(
        public tipo: TipoTransacao,
        public mercadoria: string,
        public quantidade: number,
        public valor: number,
        public data: Date = new Date()
    ) {
        //Gera um ID aleatório quando a transação é criada
        this.id = Math.random().toString(36).substring(2, 9);
    }

    //valor total da transação (quantidade é valor unitário)
    get total(): number {
        return this.quantidade * this.valor;
    }

    //Método para serialização do objeto em JSON
    toJSON() {
        return {
            id: this.id,
            tipo: this.tipo,
            mercadoria: this.mercadoria,
            quantidade: this.quantidade,
            valor: this.valor,
            data: this.data.toISOString(), //Data em formato ISO (para armazenamento)
            total: this.total
        };
    }
}