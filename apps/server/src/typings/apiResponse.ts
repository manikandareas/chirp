export type ApiResponse<T = null, E = null> = {
    statusCode: number;
    data?: T;
    error?: E;
};
