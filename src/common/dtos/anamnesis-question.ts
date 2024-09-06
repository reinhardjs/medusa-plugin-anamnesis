
import { IsObject, ValidateNested, IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../enums/anamnesis-question.enum';

export class CreateAnamnesisQuestionDto {
    @IsString()
    @IsOptional()
    question_text?: string;

    @IsOptional()
    @IsEnum(QuestionType)
    question_type?: QuestionType;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Object)
    options?: object;
    
    @IsString()
    @IsNotEmpty()
    section_id?: string;
}

export class UpdateAnamnesisQuestionDto {
    @IsString()
    @IsOptional()
    question_text?: string;

    @IsOptional()
    @IsEnum(QuestionType)
    question_type?: QuestionType;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Object)
    options?: object;
    
    @IsString()
    @IsNotEmpty()
    section_id?: string;
}
