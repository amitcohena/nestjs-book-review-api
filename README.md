## NestJS Book Review API

Simple NestJS server that provides a REST API for managing books and user-submitted reviews.

## Project setup
```bash
npm install
npm run start:dev
# open http://localhost:3000
```

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
