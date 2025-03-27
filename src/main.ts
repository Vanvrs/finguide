import { Conta } from "./types/Conta.js";
import { NovaTransacaoComponent } from "./components/nova-transacao-component.js";

const conta = new Conta();

document.addEventListener('DOMContentLoaded', () => {
    try {
        new NovaTransacaoComponent(conta);
    } catch (error) {
        console.error('Falha ao inicializar componentes:', error);
    }
});