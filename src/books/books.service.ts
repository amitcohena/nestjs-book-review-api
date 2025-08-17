import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ReviewsService } from './reviews.service';

@Injectable()
export class BooksService {
  private books: Book[] = []; 
  private nextId = 1;         

  constructor(private readonly reviewsService: ReviewsService) {}

  // Return all books
  findAll(): Book[] {
    return this.books;
  }

  // Return a single book by id or throw 404 if not found
  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  // Create a new book from DTO and return it
  create(dto: CreateBookDto): Book {
    const book: Book = { id: this.nextId++, ...dto };
    this.books.push(book);
    return book;
  }

  // Update existing book with partial fields; throw 404 if missing
  update(id: number, dto: UpdateBookDto): Book {
    const idx = this.books.findIndex(b => b.id === id);
    if (idx === -1) throw new NotFoundException('Book not found');
    this.books[idx] = { ...this.books[idx], ...dto };
    return this.books[idx];
  }

  // Remove a book and delete its reviews
  remove(id: number): void {
    const exists = this.books.some(b => b.id === id);
    if (!exists) throw new NotFoundException('Book not found');
    this.books = this.books.filter(b => b.id !== id);
    this.reviewsService.deleteByBookId(id); // keep reviews consistent
  }
}
