export class Transacao {
    constructor(tipo, mercadoria, quantidade, valor, data = new Date()) {
        this.tipo = tipo;
        this.mercadoria = mercadoria;
        this.quantidade = quantidade;
        this.valor = valor;
        this.data = data;
        //Gera um ID aleatório quando a transação é criada
        this.id = Math.random().toString(36).substring(2, 9);
    }
    //valor total da transação (quantidade é valor unitário)
    get total() {
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
