import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    parentId: string;
}
