import { Injectable } from '@nestjs/common';
import { Review } from './entities/review.interface';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];
  private nextId = 1;

  // Create a new review for a given book
  addReview(bookId: number, rating: number, comment?: string): Review {
    const review: Review = { id: this.nextId++, bookId, rating, comment };
    this.reviews.push(review);
    return review;
  }

  // Return all reviews that belong to the given book
  findByBookId(bookId: number): Review[] {
    return this.reviews.filter(r => r.bookId === bookId);
  }

  // Compute the average rating for a book
  averageForBook(bookId: number): number | null {
    const list = this.findByBookId(bookId);
    if (list.length === 0) return null;
    const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
    return Number(avg.toFixed(2));
  }

  // Delete all reviews that belong to a given book
  // Used when a book is deleted
  deleteByBookId(bookId: number): void {
    this.reviews = this.reviews.filter(r => r.bookId !== bookId);
  }
}
