import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsLowercase,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

/**
 * This class definition is for a CreateUserDto object. Here's a summary of what each class method does:
 *
 * firstName: Validates that the first name is not empty and is a string.
 * lastName: Validates that the last name is not empty and is a string.
 * username: Validates that the username is not empty and is a string.
 * bio: Validates that the bio is an optional string.
 * dob: Validates that the date of birth is not empty and is a string.
 * email: Validates that the email is not empty and is a valid email format.
 * password: Validates that the password is not empty, is at least 8 characters long, and does not start or end with whitespace.
 * image: Validates that the image is an optional string.
 * gender: Validates that the gender is not empty and is either "male" or "female".
 * address: Validates that the address is an optional string.
 */
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @IsLowercase()
    @Matches(/^[a-z0-9_]+$/, {
        message:
            'username can only contain lowercase letters, numbers, underscores, and can not contain spaces, and symbols',
    })
    username: string;

    @IsOptional()
    @MaxLength(150)
    bio: string;

    @IsNotEmpty()
    // @IsString()
    @IsDateString()
    dob: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s].*[^\s]$/, {
        message: 'Password cannot start and end with whitespace',
    })
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsEnum(['male', 'female'])
    gender: 'male' | 'female';

    @IsNotEmpty()
    @IsString()
    address: string;
}
