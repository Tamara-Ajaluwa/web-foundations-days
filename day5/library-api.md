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
  ```
* **Success Status Code:** 201 Created

### 4. Update a book
* **Method:** PUT
* **Path:** `/books/:id`
* **Description:** Updates the information of an existing book by its ID.
* **Example Request Body:** 
  ```json
  {
    "title": "The Hobbit: Revised Edition",
    "author": "J.R.R. Tolkien",
    "publishedYear": 1938
  }
  ```
* **Success Status Code:** 200 OK

### 5. Delete a book
* **Method:** DELETE
* **Path:** `/books/:id`
* **Description:** Removes a specific book from the library by its ID.
* **Success Status Code:** 204 No Content

### 6. List books by an author
* **Method:** GET
* **Path:** `/books?author=name`
* **Description:** Retrieves a list of books filtered by the author's name using a query parameter.
* **Success Status Code:** 200 OK

## Error Codes

* **400 Bad Request:** This happens when the client sends an invalid request. For example, if a user tries to create a new book (POST `/books`) but forgets to include the required `"title"` field in the JSON body.
* **404 Not Found:** This happens when the requested resource does not exist. For example, if a user tries to view, update, or delete a book using an ID that is not in the database (e.g., GET `/books/99999`).