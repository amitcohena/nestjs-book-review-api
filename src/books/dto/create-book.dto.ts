import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Book1' })
  @IsString() // title must be a string
  title: string;

  @ApiProperty({ example: 'Amit Cohen' })
  @IsString() // author must be a string
  author: string;

  @ApiProperty({ example: 2025, minimum: 0 })
  @IsInt()    // year must be an integer
  @Min(0)     // year must be >= 0
  year: number;
}
