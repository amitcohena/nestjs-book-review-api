# NestJS Book Review API

Simple NestJS server that provides a REST API for managing books and user-submitted reviews.

## Project setup
```bash
npm install
npm run start:dev
# open http://localhost:3000
```
### API Docs (Swagger)
Open http://localhost:3000/docs

## Endpoints
- GET /books
- POST /books
- GET /books/:id
- PUT /books/:id
- DELETE /books/:id
- POST /books/:id/reviews
- GET /books/:id/reviews
- GET /books/:id/rating

## Examples (cURL)
```bash
curl -X POST http://localhost:3000/books   -H "Content-Type: application/json"   -d '{"title":"Book1","author":"Amit Cohen","year":2025}'

curl http://localhost:3000/books
curl http://localhost:3000/books/1
curl -X PUT http://localhost:3000/books/1 -H "Content-Type: application/json" -d '{"year":2015}'
curl -X POST http://localhost:3000/books/1/reviews -H "Content-Type: application/json" -d '{"rating":5,"comment":"Amazing writing"}'
curl http://localhost:3000/books/1/reviews
curl http://localhost:3000/books/1/rating
curl -X DELETE http://localhost:3000/books/1
```

## Project Structure
```
src/
  app.module.ts
  main.ts
  books/
    books.module.ts
    books.controller.ts
    books.service.ts
    reviews.service.ts
    dto/
      create-book.dto.ts
      update-book.dto.ts
      create-review.dto.ts
    entities/
      book.interface.ts
      review.interface.ts
```

## Tests

This project includes basic **unit tests** using Jest.

### What is covered
- `src/books/reviews.service.spec.ts` - unit tests for `ReviewsService`:
  - add review
  - filter by `bookId`
  - average rating (or `null` if no reviews)
  - delete all reviews for a book

> Each test starts with a **fresh in-memory state** (`beforeEach` creates a new service instance), so tests are independent.

### How to run
```bash
# run a specific test file
npm run test -- src/books/reviews.service.spec.ts
