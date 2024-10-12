import { ESexo } from "src/app/shared/enum/sexo";

export class Cliente {
    id?: number;
    nome: string;
    sexo: ESexo;
    nascimento?: Date;
    telefone: string;
}