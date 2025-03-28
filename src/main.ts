import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";

const conta = new Conta();

try {
    new NovaTransacaoComponent(conta);
    new ExtratoComponent(conta);

    //Configura navegação
    document.getElementById('btnVisualizarExtrato')?.addEventListener('click', () => {
        document.querySelector('.pagina-transacao')?.classList.add('d-none');
        document.querySelector('.pagina-extrato')?.classList.remove('d-none');
    });

    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => {
        document.querySelector('.pagina-extrato')?.classList.add('d-none');
        document.querySelector('.pagina-transacao')?.classList.remove('d-none');
    });
} catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
}