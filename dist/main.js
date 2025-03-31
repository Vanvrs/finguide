var _a, _b;
import { Conta } from "./types/Conta.js";
import NovaTransacaoComponent from "./components/nova-transacao-component.js";
import ExtratoComponent from "./components/extrato-component.js";
const conta = new Conta();
try {
    new NovaTransacaoComponent(conta);
    new ExtratoComponent(conta);
    //Configura navegação atraves do eventos dom
    //ver com igor porque ao usar # para buscar por id quebra o código
    (_a = document.getElementById('btnVisualizarExtrato')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        (_a = document.querySelector('.pagina-transacao')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        (_b = document.querySelector('.pagina-extrato')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
    });
    (_b = document.getElementById('btnNovaTransacao')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        var _a, _b;
        (_a = document.querySelector('.pagina-extrato')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        (_b = document.querySelector('.pagina-transacao')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
    });
}
catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
}
