export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado precisa ser maior que zero!");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("Seu saldo é insuficiente para essa operação");
        }
        return originalMethod.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
