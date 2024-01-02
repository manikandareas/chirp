import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

/**
 * This class definition is for a CreateUserDto object. Here's a summary of what each class method does:
 *
 * firstName: Validates that the first name is not empty and is a string.
 * lastName: Validates that the last name is not empty and is a string.
 * username: Validates that the username is not empty and is a string.
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
  username: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s].*[^\s]$/, {
    message: "Password cannot start and end with whitespace",
  })
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(["male", "female"])
  gender: "male" | "female";

  @IsOptional()
  @IsString()
  address: string;
}
