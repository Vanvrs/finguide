import { Transacao } from "./Transacao.js";

export interface GrupoTransacao {
    label: string;
    transacoes: Transacao[];
}