# Library API Design

## Endpoints

### 1. List all books
* **Method:** GET
* **Path:** `/books`
* **Description:** Retrieves a list of all books in the library.
* **Success Status Code:** 200 OK

### 2. Get one book
* **Method:** GET
* **Path:** `/books/:id`
* **Description:** Retrieves the details of a specific book using its unique ID.
* **Success Status Code:** 200 OK

### 3. Create a book
* **Method:** POST
* **Path:** `/books`
* **Description:** Adds a new book to the library database.
* **Example Request Body:** 
  ```json
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "publishedYear": 1937
  }