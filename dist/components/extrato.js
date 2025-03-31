/* class Extrato {
    conta: any;
    tabela: HTMLElement | null;
    saldoTotal: HTMLElement | null;
    constructor(conta: any) {
        this.conta = conta;
        this.tabela = document.getElementById('tabelaExtrato');
        this.saldoTotal = document.getElementById('saldoTotal');
    }

    atualizar() {
        this.tabela.innerHTML = '';
        const transacoes = this.conta.getExtrato();

        transacoes.forEach(transacao => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transacao.tipo == 'COMPRA' ? 'Compra' : 'Venda'}</td>
                <td>${transacao.mercadoria}</td>
                <td>${transacao.quantidade}</td>
                <td>R$ ${transacao.valor.toFixed(2)}</td>
                <td>R$ ${transacao.total.toFixed(2)}</td>
            `;
            this.tabela.appendChild(row);
        });

        this.saldoTotal.textContent = `R$ ${this.conta.getSaldo().toFixed(2)}`;
    }
} */ 
