import { CreateUserDto } from '@chirp/dto';
import { useMutation } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, ApiFnOptions, MutationConfig } from '../../lib';
import { useApiClient } from '../../providers';
import { ApiResponse } from '../../typings';

export const registerUser: ApiFn<Omit<CreateUserDto, 'bio'>, AxiosPromise> = (
    payload,
    { axios = defaultAxios },
) => {
    return axios.post('/auth/register', payload);
};
type MutationFnType = typeof registerUser;

export const useRegisterUserMutation = (
    config: MutationConfig<MutationFnType> = {},
) => {
    const { axios } = useApiClient();

    return useMutation({
        mutationFn: (body: Omit<CreateUserDto, 'bio'>) =>
            registerUser(body, { axios }),
        ...config,
    });
};

type CheckAvaibilityFn<ParamsType, ResponseType> = (
    params: ParamsType,
    config: ApiFnOptions,
) => ResponseType;

export const checkAvailabilityEmail: CheckAvaibilityFn<
    string,
    Promise<boolean>
> = async (email, { axios = defaultAxios }) => {
    const url = '/auth/checkAvailability';
    try {
        const response = await axios.get(`${url}?email=${email}`);

        if ((response.data as ApiResponse).statusCode !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const checkAvailabilityUsername: CheckAvaibilityFn<
    string,
    Promise<boolean>
> = async (username, { axios = defaultAxios }) => {
    const url = '/auth/checkAvailability';
    try {
        const response = await axios.get(`${url}?username=${username}`);
        if ((response.data as ApiResponse).statusCode !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};
