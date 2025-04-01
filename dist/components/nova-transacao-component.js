import { formatarMoeda, formatarInputMoeda } from "../utils/formatters.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
export default class NovaTransacaoComponent {
    constructor(conta) {
        this.conta = conta;
        this.form = document.getElementById('formTransacao');
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        this.confirmAddBtn = document.getElementById('confirmAdd');
        this.configurarMascaras();
        this.configurarEventListeners();
    }
    configurarMascaras() {
        const valorInput = document.getElementById('valor');
        valorInput.addEventListener('focus', () => {
            let value = valorInput.value.replace(/[^\d,]/g, '');
            valorInput.value = value === '0,00' ? '' : value;
        });
        valorInput.addEventListener('blur', () => {
            let value = valorInput.value.replace(/[^\d,]/g, '');
            if (!value) {
                valorInput.value = 'R$ 0,00';
                return;
            }
            if (!value.includes(',')) {
                value += ',00';
            }
            else {
                const parts = value.split(',');
                if (parts[1].length === 1)
                    value = parts[0] + ',' + parts[1] + '0';
                if (parts[1].length > 2)
                    value = parts[0] + ',' + parts[1].substring(0, 2);
            }
            valorInput.value = 'R$ ' + value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        });
        valorInput.addEventListener('input', (e) => {
            let value = valorInput.value.replace(/[^\d,]/g, '');
            const cursorPos = valorInput.selectionStart;
            valorInput.value = value;
            if (cursorPos !== null) {
                valorInput.setSelectionRange(cursorPos, cursorPos);
            }
        });
    }
    configurarEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validarEConfirmar();
        });
        this.confirmAddBtn.addEventListener('click', () => {
            this.adicionarTransacao();
            this.adicionarModal.hide();
        });
    }
    validarEConfirmar() {
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const valorInput = document.getElementById('valor').value;
        const valor = formatarInputMoeda(valorInput);
        if (!this.validarCampos(mercadoria, quantidade, valor))
            return;
        if (tipo === TipoTransacao.COMPRA) {
            const saldoAtual = this.conta.getSaldo();
            const valorTotalCompra = quantidade * valor;
            if (saldoAtual <= 0) {
                alert('Saldo insuficiente para realizar compras. Seu saldo atual � zero ou negativo.');
                return;
            }
            if (valorTotalCompra > saldoAtual) {
                alert(`Saldo insuficiente para esta compra. Saldo disponível: ${formatarMoeda(saldoAtual)}`);
                return;
            }
        }
        document.getElementById('modalItemAdicionar').textContent = mercadoria;
        document.getElementById('modalQuantidadeAdicionar').textContent = quantidade.toString();
        document.getElementById('modalValorAdicionar').textContent = formatarMoeda(valor);
        this.adicionarModal.show();
    }
    validarCampos(mercadoria, quantidade, valor) {
        if (!mercadoria || mercadoria.length > 35) {
            alert('Nome do produto deve ter at� 35 caracteres');
            return false;
        }
        if (isNaN(quantidade) || quantidade <= 0) {
            alert('Quantidade deve ser um n�mero positivo');
            return false;
        }
        if (isNaN(valor) || valor <= 0) {
            alert('Valor deve ser positivo');
            return false;
        }
        return true;
    }
    adicionarTransacao() {
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const valorInput = document.getElementById('valor').value;
        const valor = formatarInputMoeda(valorInput);
        if (isNaN(valor) || valor <= 0) {
            alert('Valor inv�lido!');
            return;
        }
        const transacao = new Transacao(tipo, mercadoria, quantidade, valor);
        this.conta.adicionarTransacao(transacao);
        document.dispatchEvent(new CustomEvent('transacao-adicionada'));
        this.form.reset();
        document.getElementById('valor').value = 'R$ 0,00';
    }
}
