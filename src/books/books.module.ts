import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ReviewsService],
})
export class BooksModule {}
