import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

// UpdateBookDto is the same as CreateBookDto but all fields are optional
export class UpdateBookDto extends PartialType(CreateBookDto) {}
