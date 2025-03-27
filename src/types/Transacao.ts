export enum TipoTransacao {
    COMPRA = "Compra",
    VENDA = "Venda"
}

export class Transacao {
    constructor(
        public id: number,
        public tipoTransacao: TipoTransacao,
        public mercadoria: string,
        public produto: string,
        public quantidade: number,
        public valor: number,
        public data: Date
    ) {}

    // Método para serialização
    toJSON() {
        return {
            id: this.id,
            tipoTransacao: this.tipoTransacao,
            mercadoria: this.mercadoria,
            produto: this.produto,
            quantidade: this.quantidade,
            valor: this.valor,
            data: this.data.toISOString()
        };
    }

    //Método estático para desserialização
    static fromJSON(json: any): Transacao {
        return new Transacao(
            json.id,
            json.tipoTransacao,
            json.mercadoria,
            json.produto,
            json.quantidade,
            json.valor,
            new Date(json.data)
        );
    }
}