import { IsObject, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnamnesisResponseDto {
    @IsString()
    @IsOptional()
    customer_id?: string;

    @IsString()
    @IsOptional()
    order_id?: string;

    @IsString()
    @IsOptional()
    form_id?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Object)
    responses?: object;
}

export class UpdateAnamnesisResponseDto {
    @IsString()
    @IsOptional()
    customer_id?: string;

    @IsString()
    @IsOptional()
    order_id?: string;

    @IsString()
    @IsOptional()
    form_id?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Object)
    responses?: object;
}
