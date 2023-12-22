import { CreateUserDto } from '@chirp/dto';

/**
 * Defines a type TCombinerName that represents a function signature for combining
 * first and last names into a single full name, based on the structure of CreateUserDto.
 *
 * @param prevName - An object containing the previous first and last names extracted from CreateUserDto.
 * @param firstName - The new first name to be combined.
 * @param lastName - The new last name to be combined.
 *
 * @returns A string representing the combined full name.
 */
type TCombinerName = (
    prevName: Pick<CreateUserDto, 'firstName' | 'lastName'>,
    firsName: string,
    lastName: string
) => string;

/**
 * Combines first and last names into a single full name, based on the structure of CreateUserDto.
 * If either first name or last name is provided, it combines the new values; otherwise, it uses the previous values.
 *
 * @param prevName - An object containing the previous first and last names extracted from CreateUserDto.
 * @param firstName - The new first name to be combined.
 * @param lastName - The new last name to be combined.
 *
 * @returns A string representing the combined full name.
 */
export const combinerName: TCombinerName = (prevName, firsName, lastName) => {
    if (firsName && lastName) return `${firsName} ${lastName}`;

    if (firsName) return `${firsName} ${prevName.lastName}`;

    if (lastName) return `${prevName.firstName} ${lastName}`;

    return `${prevName.firstName} ${prevName.lastName}`;
};

/**
 * Checks if any attribute in the provided object has a nullish value.
 *
 * @param obj - The object to be checked for nullish values.
 *
 * @returns A boolean indicating whether any attribute in the object has a nullish value.
 */
export const nullishObjectChecker = (obj: object) => {
    return Object.values(obj).some((atribut) => atribut !== null);
};
