
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnamnesisSectionDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    order?: number;

    @IsString()
    @IsNotEmpty()
    form_id?: string;
}

export class UpdateAnamnesisSectionDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    order?: number;

    @IsString()
    @IsNotEmpty()
    form_id?: string;
}
