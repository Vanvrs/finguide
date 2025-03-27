export class Armazenador {
    static salvar(chave: string, valor: any): void {
        const valorParaSalvar = JSON.stringify(valor, (key, value) => {
            if (value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
        localStorage.setItem(chave, valorParaSalvar);
    }

    static obter<T>(chave: string): T | null {
        const valor = localStorage.getItem(chave);
        if (!valor) return null;

        return JSON.parse(valor, (key, value) => {
            if (key === 'data' && typeof value === 'string') {
                return new Date(value);
            }
            return value;
        }) as T;
    }
}