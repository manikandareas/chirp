import { IsNotEmpty, IsString } from "class-validator";

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
