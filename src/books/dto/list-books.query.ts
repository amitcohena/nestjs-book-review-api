import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ListBooksQuery {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  year?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minYear?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxYear?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  order?: string;
}
