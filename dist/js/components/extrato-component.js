import { formatarMoeda } from "../utils/formatters";
import { TipoTransacao } from "../types/Transacao";
export class ExtratoComponent {
    constructor(conta) {
        this.transacaoParaDeletar = null;
        this.conta = conta;
        this.listaTransacoes = document.getElementById('listaTransacoes');
        const modalElement = document.getElementById('confirmModal');
        if (modalElement) {
            this.modal = new bootstrap.Modal(modalElement);
        }
        this.configurarEventos();
        this.atualizar();
    }
    configurarEventos() {
        const confirmDelete = document.getElementById('confirmDelete');
        if (confirmDelete) {
            confirmDelete.addEventListener('click', () => {
                if (this.transacaoParaDeletar !== null) {
                    this.conta.removerTransacao(this.transacaoParaDeletar);
                    this.atualizar();
                    this.modal.hide();
                }
            });
        }
    }
    mostrarModalConfirmacao(transacaoId) {
        const transacao = this.conta.getTransacaoPorId(transacaoId);
        if (!transacao)
            return;
        this.transacaoParaDeletar = transacaoId;
        const detailsElement = document.getElementById('transactionDetails');
        if (detailsElement) {
            const tipo = transacao.tipoTransacao === TipoTransacao.COMPRA ? '-' : '+';
            const valorTotal = transacao.valor * transacao.quantidade;
            const valorFormatado = formatarMoeda(transacao.valor);
            const totalFormatado = formatarMoeda(valorTotal);
            detailsElement.innerHTML = `
                <p><strong>Tipo:</strong> ${transacao.tipoTransacao}</p>
                <p><strong>Mercadoria:</strong> ${transacao.mercadoria}</p>
                <p><strong>Produto:</strong> ${transacao.produto}</p>
                <p><strong>Quantidade:</strong> ${transacao.quantidade}</p>
                <p><strong>Valor Unitário:</strong> ${valorFormatado}</p>
                <p><strong>Total:</strong> ${totalFormatado}</p>
                <p><strong>Data:</strong> ${transacao.data.toLocaleDateString('pt-BR')}</p>
            `;
        }
        this.modal.show();
    }
    atualizar() {
        if (!this.listaTransacoes)
            return;
        const grupos = this.conta.getGruposTransacoes();
        this.listaTransacoes.innerHTML = '';
        if (!grupos || grupos.length === 0) {
            this.listaTransacoes.innerHTML = '<p class="text-center">Nenhuma transação encontrada.</p>';
            return;
        }
        grupos.forEach((grupo) => {
            const grupoElement = document.createElement('div');
            grupoElement.className = 'grupo-transacao mb-4';
            const labelElement = document.createElement('h3');
            labelElement.className = 'grupo-label';
            labelElement.textContent = grupo.label;
            grupoElement.appendChild(labelElement);
            grupo.transacoes.forEach(transacao => {
                const tipo = transacao.tipoTransacao === TipoTransacao.COMPRA ? '-' : '+';
                const valorTotal = transacao.valor * transacao.quantidade;
                const valorFormatado = formatarMoeda(valorTotal);
                const transacaoElement = document.createElement('div');
                transacaoElement.className = 'transacao d-flex justify-content-between align-items-center p-3 mb-2';
                transacaoElement.innerHTML = `
                    <div class="transacao-info">
                        <span class="tipo ${tipo === '+' ? 'text-success' : 'text-danger'}">${tipo}</span>
                        <span class="mercadoria">${transacao.mercadoria}</span>
                        <span class="quantidade">${transacao.quantidade}x</span>
                        <span class="produto small text-muted">${transacao.produto}</span>
                    </div>
                    <div class="transacao-valor">
                        <span class="valor">${valorFormatado}</span>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${transacao.id}">
                            Excluir
                        </button>
                    </div>
                `;
                grupoElement.appendChild(transacaoElement);
            });
            this.listaTransacoes.appendChild(grupoElement);
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target;
                const id = parseInt(target.getAttribute('data-id') || '0');
                this.mostrarModalConfirmacao(id);
            });
        });
        const saldoTotalElement = document.getElementById('saldoTotal');
        if (saldoTotalElement) {
            saldoTotalElement.textContent = formatarMoeda(this.conta.getSaldo());
        }
    }
}
