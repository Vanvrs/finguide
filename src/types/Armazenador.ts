export class Armazenador {
    static salvar(chave: string, valor: any): void {
        try {
            const valorJSON = JSON.stringify(valor);
            localStorage.setItem(chave, valorJSON);
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }

    static obter<T>(chave: string): T | null {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) as T : null;
        } catch (error) {
            console.error('Erro ao ler do localStorage:', error);
            return null;
        }
    }
}