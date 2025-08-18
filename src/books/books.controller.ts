import {
    Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { ReviewsService } from './reviews.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { CreateReviewDto } from './dto/create-review.dto';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('books')            // swagger
  @Controller('books')
  export class BooksController {
    constructor(
      private readonly booksService: BooksService,
      private readonly reviewsService: ReviewsService,
    ) {}
  
    // GET /books - list all books
    @Get()
    getAll() {
      return this.booksService.findAll();
    }
  
    // POST /books - create a new book
    @Post()
    create(@Body() dto: CreateBookDto) {
      return this.booksService.create(dto);
    }
  
    // GET /books/:id - get book details
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
      return this.booksService.findOne(id);
    }
  
    // PUT /books/:id - update a book
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateBookDto,
    ) {
      return this.booksService.update(id, dto);
    }
  
    // DELETE /books/:id - delete a book and its reviews
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      this.booksService.remove(id);
      return { message: 'Book deleted' };
    }
  
    // POST /books/:id/reviews - add a review to a book
    @Post(':id/reviews')
    addReview(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: CreateReviewDto,
    ) {
      this.booksService.findOne(id);
      return this.reviewsService.addReview(id, dto.rating, dto.comment);
    }
  
    // GET /books/:id/reviews - get all reviews for a book
    @Get(':id/reviews')
    getReviews(@Param('id', ParseIntPipe) id: number) {
      this.booksService.findOne(id);
      return this.reviewsService.findByBookId(id);
    }
  
    // GET /books/:id/rating - get average rating for a book or null if no reviews
    @Get(':id/rating')
    getAverage(@Param('id', ParseIntPipe) id: number) {
      this.booksService.findOne(id);
      const avg = this.reviewsService.averageForBook(id);
      return { average: avg, bookId: id };
    }
  }
  