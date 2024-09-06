
import { IsString, IsOptional } from 'class-validator';

export class CreateAnamnesisFormDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateAnamnesisFormDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
