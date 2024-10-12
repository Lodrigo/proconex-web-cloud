export class ApiResponse<T> {
    content: T;
    page: number;
    pageSize: number;
    total: number;
}