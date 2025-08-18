import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(() => {
    // Create a fresh instance before each test
    service = new ReviewsService();
  });

  it('should add a review', () => {
    const r1 = service.addReview(1, 5, 'Great');
    const r2 = service.addReview(1, 3);

    // Checking the created reviews
    expect(r1).toEqual({ id: 1, bookId: 1, rating: 5, comment: 'Great' });
    expect(r2.id).toBe(2);

    // Ensure reviews are stored
    expect(service.findByBookId(1)).toHaveLength(2);
  });

  it('should filter reviews by bookId', () => {
    service.addReview(1, 5);
    service.addReview(2, 4);

    const list = service.findByBookId(2);
    expect(list).toHaveLength(1);
    expect(list[0].bookId).toBe(2);
  });

  it('should compute average rating or null when no reviews', () => {
    expect(service.averageForBook(1)).toBeNull();

    // 5 and 4 = average 4.5
    service.addReview(1, 5);
    service.addReview(1, 4);
    expect(service.averageForBook(1)).toBe(4.5);

    // Add 3 = (5+4+3)/3 = 4
    service.addReview(1, 3);
    expect(service.averageForBook(1)).toBe(4);
  });

  it('should delete all reviews for a given book', () => {
    service.addReview(1, 5);
    service.addReview(1, 2);
    service.addReview(2, 4);

    service.deleteByBookId(1);

    expect(service.findByBookId(1)).toHaveLength(0);
    expect(service.findByBookId(2)).toHaveLength(1);
  });
});
