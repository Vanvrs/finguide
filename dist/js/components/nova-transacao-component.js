import { formatarMoeda, formatarInputMoeda } from "../utils/formatters.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
//Classe principal para o componente de nova transa��o
export default class NovaTransacaoComponent {
    //inicializa o componente
    constructor(conta) {
        //Armazena a conta recebida
        this.conta = conta;
        this.form = document.getElementById('formTransacao');
        //Configura o modal usando Bootstrap
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        //Obt�m o bot�o de confirma��o do modal
        this.confirmAddBtn = document.getElementById('confirmAdd');
        this.configurarMascaras();
        this.configurarEventListeners();
    }
    //Configura m�scaras para formata��o de valores monet�rios
    configurarMascaras() {
        const valorInput = document.getElementById('valor');
        //Isso configura uma fun��o que ser� executada quando for clicado para o campo de input.
        valorInput.addEventListener('focus', () => {
            //Remove formata��o, deixando apenas n�meros e v�rgula
            let value = valorInput.value.replace(/[^\d,]/g, '');
            //Se for o valor padr�o (0,00), limpa o campo e retorna vazia
            valorInput.value = value === '0,00' ? '' : value;
        });
        //Esse blur Filtra caracteres inv�lido
        //formata o valor novamente (ex: adiciona separadores de milhar, s�mbolo de moeda)
        valorInput.addEventListener('blur', () => {
            let value = valorInput.value.replace(/[^\d,]/g, ''); //Remove formata��o
            //Se n�o houver valor, define como R$ 0,00
            if (!value) {
                valorInput.value = 'R$ 0,00';
                return;
            }
            //Garante que tenha casas decimais
            if (!value.includes(',')) {
                value += ',00';
            }
            else {
                //Formata corretamente as casas decimais
                const parts = value.split(',');
                if (parts[1].length === 1)
                    value = parts[0] + ',' + parts[1] + '0';
                if (parts[1].length > 2)
                    value = parts[0] + ',' + parts[1].substring(0, 2);
            }
            //Aplica formata��o monet�ria 
            valorInput.value = 'R$ ' + value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        });
    }
    //Configura os eventos
    configurarEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validarEConfirmar();
        });
        //bot�o de confirma��o no modal
        this.confirmAddBtn.addEventListener('click', () => {
            this.adicionarTransacao();
            this.adicionarModal.hide();
        });
    }
    //Valida os campos e prepara a confirma��o
    validarEConfirmar() {
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const valorInput = document.getElementById('valor').value;
        const valor = formatarInputMoeda(valorInput); //Converte para n�mero
        //Valida��es dos campos
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
                alert(`Saldo insuficiente para esta compra. Saldo dispon�vel: ${formatarMoeda(saldoAtual)}`);
                return;
            }
        }
        //modal de confirma��o com os dados
        document.getElementById('modalItemAdicionar').textContent = mercadoria;
        document.getElementById('modalQuantidadeAdicionar').textContent = quantidade.toString();
        document.getElementById('modalValorAdicionar').textContent = formatarMoeda(valor);
        //Exibi��o do modal de confirma��o
        this.adicionarModal.show();
    }
    //Valida��es dos campos do formul�rio
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
    //Adiciona a transa��o � conta
    adicionarTransacao() {
        //Obt�m os valores dos campos novamente para garantir consist�ncia
        const tipo = document.getElementById('tipoTransacao').value;
        const mercadoria = document.getElementById('mercadoria').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const valorInput = document.getElementById('valor').value;
        const valor = formatarInputMoeda(valorInput);
        //Valida��o final do valor
        if (isNaN(valor) || valor <= 0) {
            alert('Valor inv�lido!');
            return;
        }
        //Cria uma nova transa��o com os dados obtidos
        const transacao = new Transacao(tipo, mercadoria, quantidade, valor);
        //Adiciona a transa��o � conta
        this.conta.adicionarTransacao(transacao);
        //Dispara um evento de notifica��o para outros componentes
        document.dispatchEvent(new CustomEvent('transacao-adicionada'));
        this.form.reset();
        //valor padr�o para o campo de valor
        document.getElementById('valor').value = 'R$ 0,00';
    }
}
