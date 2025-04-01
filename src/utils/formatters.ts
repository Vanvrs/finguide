/* export const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace(/\u00A0/g, ' ');
};

export const formatarInputMoeda = (valor: string): number => {
    const valorLimpo = valor.replace(/[^\d,]/g, '').replace(',', '.');
    const valorNumerico = parseFloat(valorLimpo);
    return isNaN(valorNumerico) ? 0 : valorNumerico;
};
export const formatarData = (data: Date): string => {
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}; */

import { FormatoData } from "../types/FormatoData.js";

export const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace(/\u00A0/g, ' ');
};

export const formatarInputMoeda = (valor: string): number => {
    const valorLimpo = valor.replace(/[^\d,]/g, '').replace(',', '.');
    const valorNumerico = parseFloat(valorLimpo);
    return isNaN(valorNumerico) ? 0 : valorNumerico;
};

export const formatarData = (data: Date, formato: FormatoData = FormatoData.PADRAO): string => {
    if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        });
    }

    return data.toLocaleDateString('pt-BR');
};