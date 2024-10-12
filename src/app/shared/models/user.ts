import { UserPermission } from "src/app/components/user/enums/user-type";
import { UserStatus } from "../../components/user/enums/user-status";

export class User {
    id: string;
    name: string;
    email: string | null;
    type: string;
    status: UserStatus;
    regions: string[];
}

export class UserProconex {
    dataCadastro: string;
    email: string;
    id: string;
    nome: string;
    notificacoes: string;
    perfil: number;
    senha: string;
    ultimoAcesso: string;
    valido: boolean;
}