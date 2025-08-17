import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()    // rating must be an integer
  @Min(1)     // rating must be at least 1
  @Max(5)     // rating must be at most 5
  rating: number;

  @IsOptional() // comment is optional
  @IsString()   // if provided, comment must be a string
  comment?: string;
}
