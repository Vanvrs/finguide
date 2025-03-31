export class Transacao {
    constructor(tipo, mercadoria, quantidade, valor, data = new Date()) {
        this.tipo = tipo;
        this.mercadoria = mercadoria;
        this.quantidade = quantidade;
        this.valor = valor;
        this.data = data;
        this.id = Math.random().toString(36).substring(2, 9);
    }
    get total() {
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
