import { TipoTransacao } from "./TipoTransacao.js";

export class Transacao {
    public id: string; //essa propriedade armazenar� um ID �nico para a transa��o

    constructor(
        public tipo: TipoTransacao,
        public mercadoria: string,
        public quantidade: number,
        public valor: number,
        public data: Date = new Date()
    ) {
        //Gera um ID aleat�rio quando a transa��o � criada
        this.id = Math.random().toString(36).substring(2, 9);
    }

    //valor total da transa��o (quantidade � valor unit�rio)
    get total(): number {
        return this.quantidade * this.valor;
    }

    //M�todo para serializa��o do objeto em JSON
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