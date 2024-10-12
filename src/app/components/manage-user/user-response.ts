import { User, UserProconex } from "src/app/shared/models/user";

export interface UserResponse {
    content: UserProconex;
    page: number;
    pageSize: number;
    total: number;
}

// export interface UserResponse {
//     content: User[];
//     page: number;
//     pageSize: number;
//     total: number;
// }