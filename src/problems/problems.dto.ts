import { IsNotEmpty, IsString } from 'class-validator';

export class ProblemDto {
  @IsString()
  @IsNotEmpty()
  problemName: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
