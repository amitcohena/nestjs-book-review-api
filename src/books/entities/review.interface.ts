// Review entity represents how a Review is stored/handled
export interface Review {
    id: number;      
    bookId: number;  // the book this review belongs to
    rating: number;  // rating between 1 and 5
    comment?: string; // optional reviewer comment
  }
  