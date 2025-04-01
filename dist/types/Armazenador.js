export class Armazenador {
    static salvar(chave, valor) {
        try {
            const valorJSON = JSON.stringify(valor);
            localStorage.setItem(chave, valorJSON);
        }
        catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }
    static obter(chave) {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : null;
        }
        catch (error) {
            console.error('Erro ao ler do localStorage:', error);
            return null;
        }
    }
}
