export type ApiResponse<T=null, E=null> = {
    status: number
    data?: T,
    error?: E
}