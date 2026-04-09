import { FetchError } from 'ofetch';

const VALIDATION_ERROR_CODE = 422;
const SERVER_ERROR_CODE = 500;

export const useApiError = (error: any) => {
    const isFetchError = error instanceof FetchError;
    const isValidationError =
        isFetchError && error.response?.status === VALIDATION_ERROR_CODE;
    const code = isFetchError ? error.response?.status : SERVER_ERROR_CODE;

    const bag: any = isValidationError
        ? Object.keys(error.response?._data.errors).map((err) => ({
            name: err,
            message: error.response?._data.errors[err][0]
        }))
        : {}

    return {
        isValidationError,
        code,
        bag,
    };
};