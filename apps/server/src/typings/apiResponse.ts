/**
 * Defines a generic type ApiResponse with 3 parameters, 2 of which are optional.
 *
 * @property {number} statusCode - The HTTP status code of the API response.
 * @property {T | undefined} data - Optional. The data included in the API response. Defaults to null if not provided.
 * @property {E | undefined} error - Optional. The error information included in the API response. Defaults to null if not provided.
 */
export type ApiResponse<T = null, E = null> = {
    statusCode: number;
    data?: T;
    error?: E;
};
