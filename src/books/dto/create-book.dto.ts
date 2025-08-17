import { IsInt, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString() // title must be a string
  title: string;

  @IsString() // author must be a string
  author: string;

  @IsInt()    // year must be an integer
  @Min(0)     // year must be >= 0
  year: number;
}
