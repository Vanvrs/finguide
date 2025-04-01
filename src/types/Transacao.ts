import { TipoTransacao } from "./TipoTransacao.js";

export class Transacao {
    public id: string;

    constructor(
        public tipo: TipoTransacao,
        public mercadoria: string,
        public quantidade: number,
        public valor: number,
        public data: Date = new Date()
    ) {
        this.id = Math.random().toString(36).substring(2, 9);
    }

    get total(): number {
        return this.quantidade * this.valor;
    }

    toJSON() {
        return {
            id: this.id,
            tipo: this.tipo,
            mercadoria: this.mercadoria,
            quantidade: this.quantidade,
            valor: this.valor,
            data: this.data.toISOString(),
            total: this.total
        };
    }
}