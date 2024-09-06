import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityType } from '../enums/translation.enum';

export class CreateTranslationDto {
    @IsEnum(EntityType)
    @IsNotEmpty()
    entity_type: EntityType;

    @IsString()
    @IsOptional()
    entity_id: string | null;

    @IsString()
    @IsOptional()
    language_code: string | null;

    @IsString()
    @IsOptional()
    translated_text: string | null;
}

export class UpdateTranslationDto {
    @IsEnum(EntityType)
    @IsOptional()
    entity_type?: EntityType;

    @IsString()
    @IsOptional()
    entity_id?: string | null;

    @IsString()
    @IsOptional()
    language_code?: string | null;

    @IsString()
    @IsOptional()
    translated_text?: string | null;
}
