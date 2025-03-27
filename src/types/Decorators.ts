   export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (this: any, valorDoDebito: number) {
            if (valorDoDebito <= 0) {
                throw new Error("O valor a ser debitado precisa ser maior que zero!");
            }
    
            if (valorDoDebito > this.saldo) {
                throw new Error("Seu saldo é insuficiente para essa operação");
            }
    
            return originalMethod.apply(this, [valorDoDebito]);
        }
        
        return descriptor;
    }