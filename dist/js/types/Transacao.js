export var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["COMPRA"] = "Compra";
    TipoTransacao["VENDA"] = "Venda";
})(TipoTransacao || (TipoTransacao = {}));
export class Transacao {
    constructor(id, tipoTransacao, mercadoria, produto, quantidade, valor, data) {
        this.id = id;
        this.tipoTransacao = tipoTransacao;
        this.mercadoria = mercadoria;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valor = valor;
        this.data = data;
    }
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
    static fromJSON(json) {
        return new Transacao(json.id, json.tipoTransacao, json.mercadoria, json.produto, json.quantidade, json.valor, new Date(json.data));
    }
}
