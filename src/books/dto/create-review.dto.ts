import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()    // rating must be an integer
  @Min(1)     // rating must be at least 1
  @Max(5)     // rating must be at most 5
  rating: number;

  @ApiPropertyOptional({ example: 'Amazing writing' })
  @IsOptional() // comment is optional
  @IsString()   // if provided, comment must be a string
  comment?: string;
}
