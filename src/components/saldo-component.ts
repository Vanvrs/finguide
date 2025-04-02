import { Conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

//Respons�vel por exibir e atualizar o saldo
export class SaldoComponent {
     private elementoSaldoTotal: HTMLElement;  
    private elementoSaldoHeader: HTMLElement;  

    //inicializa o componente
    constructor(private conta: Conta) {
        this.elementoSaldoTotal = document.getElementById('saldoTotal') as HTMLElement;
        this.elementoSaldoHeader = document.getElementById('saldoHeader') as HTMLElement;
        
        //Atualiza os valores exibidos inicialmente e configura eventos
        this.atualizar();
        this.configurarEventListeners();
    }

    //Configura os eventos de atualiza��o
    private configurarEventListeners(): void {
        //Evento de adicionar transa��o
        document.addEventListener('transacao-adicionada', () => this.atualizar());
        
        //Evento de remo��o transa��o
        document.addEventListener('transacao-removida', () => this.atualizar());
    }

    //Atualiza a exibi��o do saldo
    public atualizar(): void {
        const saldo = this.conta.getSaldo();

        //Formata o valor para exibi��o monet�ria
        const saldoFormatado = formatarMoeda(saldo);

        //Atualiza o conte�do dos elementos com o saldo formatado
        this.elementoSaldoTotal.textContent = saldoFormatado;
        this.elementoSaldoHeader.textContent = saldoFormatado;
        
        
        const classeCor = saldo >= 0 ? 'texto-roxo' : 'text-danger';
    
        this.elementoSaldoTotal.className = classeCor;
        this.elementoSaldoHeader.className = classeCor;
    }
}