import { NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBooksQuery } from './dto/list-books.query';

// Creating small fake ReviewsService (only what BooksService calls)
class FakeReviewsService {
  lastDeletedBookId: number | null = null;

  deleteByBookId(id: number) {
    this.lastDeletedBookId = id;
  }
}

describe('BooksService', () => {
  let service: BooksService;
  let reviews: FakeReviewsService;

  beforeEach(() => {
    // Create a fresh instance before each test
    reviews = new FakeReviewsService();
    service = new BooksService(reviews as any);
  });

  it('should create books', () => {
    const b1: CreateBookDto = { title: 'A', author: 'X', year: 2025 };
    const b2: CreateBookDto = { title: 'B', author: 'Y', year: 2024 };

    const r1 = service.create(b1);
    const r2 = service.create(b2);
    
    // Checking the created books
    expect(r1.id).toBe(1);
    expect(r2.id).toBe(2);
  });

  it('finds a book by id or throws 404', () => {
    const created = service.create({ title: 'A', author: 'X', year: 2025 });

    // existing book check
    const found = service.findOne(created.id);
    expect(found).toEqual(created);

    // non-existing book check
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('updates a book', () => {
    const created = service.create({ title: 'A', author: 'X', year: 2025 });

    const update: UpdateBookDto = { year: 2030 };
    const updated = service.update(created.id, update);

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('A');
    expect(updated.author).toBe('X');
    expect(updated.year).toBe(2030);
  });

  it('removes a book and delete its reviews', () => {
    const b1 = service.create({ title: 'A', author: 'X', year: 2025 });
    const b2 = service.create({ title: 'B', author: 'Y', year: 2024 });

    service.remove(b1.id);

    // After removal, finding should throw 404
    expect(() => service.findOne(b1.id)).toThrow(NotFoundException);

    // Ensure all reviews have been deleted
    expect(reviews.lastDeletedBookId).toBe(b1.id);

    // Other books remain
    expect(service.findOne(b2.id).id).toBe(b2.id);
  });

  it('throws 404 when removing a non-existing book', () => {
    expect(() => service.remove(123)).toThrow(NotFoundException);
  });

  it('findAll supports filtering by year range and sorting by year desc', () => {
    service.create({ title: 'A', author: 'X', year: 2025 });
    service.create({ title: 'B', author: 'Y', year: 2024 });
    service.create({ title: 'C', author: 'Z', year: 2023 });

    // Expect only years >= 2024, sorted by year descending: 2024, 2025
    const q: ListBooksQuery = { minYear: 2024, sort: 'year', order: 'desc' };
    const list = service.findAll(q);

    expect(list.map(b => b.year)).toEqual([2025, 2024]);
  });
});
