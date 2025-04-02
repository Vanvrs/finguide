export class Transacao {
    constructor(tipo, mercadoria, quantidade, valor, data = new Date()) {
        this.tipo = tipo;
        this.mercadoria = mercadoria;
        this.quantidade = quantidade;
        this.valor = valor;
        this.data = data;
        //Gera um ID aleat�rio quando a transa��o � criada
        this.id = Math.random().toString(36).substring(2, 9);
    }
    //valor total da transa��o (quantidade � valor unit�rio)
    get total() {
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
