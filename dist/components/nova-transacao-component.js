/* import { Conta } from "../types/Conta.js";
import { formatarMoeda, formatarInputMoeda } from "../utils/formatters.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";

declare const bootstrap: any;//carregar bootstrap globalmente

export default class NovaTransacaoComponent {
    private form: HTMLFormElement;
    private conta: Conta;
    private adicionarModal: any;
    private confirmAddBtn: HTMLButtonElement;

    constructor(conta: Conta) {
        this.conta = conta;
        this.form = document.getElementById('formTransacao') as HTMLFormElement;
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        this.confirmAddBtn = document.getElementById('confirmAdd') as HTMLButtonElement;

        this.configurarMascaras();
        this.configurarEventListeners();
    }

    private configurarMascaras(): void {
        const valorInput = document.getElementById('valor') as HTMLInputElement;

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
            } else {
                const parts = value.split(',');
                if (parts[1].length === 1) value = parts[0] + ',' + parts[1] + '0';
                if (parts[1].length > 2) value = parts[0] + ',' + parts[1].substring(0, 2);
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

    private configurarEventListeners(): void {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validarEConfirmar();
        });

        this.confirmAddBtn.addEventListener('click', () => {
            this.adicionarTransacao();
            this.adicionarModal.hide();
        });
    }

    private validarEConfirmar(): void {
        const tipo = (document.getElementById('tipoTransacao') as HTMLSelectElement).value as TipoTransacao;
        const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement).value.trim();
        const quantidade = parseInt((document.getElementById('quantidade') as HTMLInputElement).value);
        const valorInput = (document.getElementById('valor') as HTMLInputElement).value;
        const valor = formatarInputMoeda(valorInput);

        if (!this.validarCampos(mercadoria, quantidade, valor)) return;

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

        document.getElementById('modalItemAdicionar')!.textContent = mercadoria;
        document.getElementById('modalQuantidadeAdicionar')!.textContent = quantidade.toString();
        document.getElementById('modalValorAdicionar')!.textContent = formatarMoeda(valor);

        this.adicionarModal.show();
    }

    private validarCampos(mercadoria: string, quantidade: number, valor: number): boolean {
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

    private adicionarTransacao(): void {
        const tipo = (document.getElementById('tipoTransacao') as HTMLSelectElement).value as TipoTransacao;
        const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement).value;
        const quantidade = parseInt((document.getElementById('quantidade') as HTMLInputElement).value);
        const valorInput = (document.getElementById('valor') as HTMLInputElement).value;
        const valor = formatarInputMoeda(valorInput);

        if (isNaN(valor) || valor <= 0) {
            alert('Valor inv�lido!');
            return;
        }

        const transacao = new Transacao(
            tipo,
            mercadoria,
            quantidade,
            valor
        );

        this.conta.adicionarTransacao(transacao);
        document.dispatchEvent(new CustomEvent('transacao-adicionada'));

        this.form.reset();
        (document.getElementById('valor') as HTMLInputElement).value = 'R$ 0,00';
    }

    
} */
import { formatarMoeda, formatarInputMoeda } from "../utils/formatters.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
//Classe principal para o componente de nova transa��o
export default class NovaTransacaoComponent {
    //inicializa o componente
    constructor(conta) {
        // Armazena a conta recebida
        this.conta = conta;
        this.form = document.getElementById('formTransacao');
        //Configura o modal usando Bootstrap
        const modalElement = document.getElementById('adicionarModal');
        this.adicionarModal = new bootstrap.Modal(modalElement);
        // Obt�m o bot�o de confirma��o do modal
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
        /*     //Evento durante a digita��o
            valorInput.addEventListener('input', (e) => {
                //Mant�m apenas n�meros e v�rgula
                let value = valorInput.value.replace(/[^\d,]/g, '');
                //Guarda a posi��o atual do cursor
                const cursorPos = valorInput.selectionStart;
    
                //Atualiza o valor
                valorInput.value = value;
    
                //Reposiciona o cursor
                if (cursorPos !== null) {
                    valorInput.setSelectionRange(cursorPos, cursorPos);
                }
            }); */
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
