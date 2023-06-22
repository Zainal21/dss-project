import { IsNotEmpty, IsString } from 'class-validator';

export class ClassificationDto {
  @IsNotEmpty()
  @IsString()
  classificationName: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  problemId: string;
}
