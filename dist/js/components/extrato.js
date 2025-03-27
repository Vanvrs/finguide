import { Conta } from "../types/Conta";
import { ExtratoComponent } from "./extrato-component";
const conta = new Conta();
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ExtratoComponent(conta);
    }
    catch (error) {
        console.error('Falha ao inicializar componente de extrato:', error);
        alert('Ocorreu um erro ao carregar o extrato. Por favor, recarregue a página.');
    }
});
