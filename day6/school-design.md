Table Explanations
The students table stores individual student information, including a unique ID, name, and email address. The courses table holds the class offerings, containing a unique ID and the course title. The enrolments table acts as a bridge between students and courses, storing the specific grade a student received in a particular class.

Database Relationships
There is a many-to-many relationship between students and courses, as one student can take multiple courses, and one course can have multiple students. Relational databases cannot handle direct many-to-many relationships, which is why the enrolments join table is needed. This join table breaks the many-to-many relationship down into two one-to-many relationships: one student to many enrolments, and one course to many enrolments.

Proposed Index
I would add an index to the name column in the students table (CREATE INDEX idx_student_name ON students(name);). The assignment requires us to query courses for one student by name, and adding an index here will significantly speed up database lookups when searching for specific students as the database grows.

SQL vs. NoSQL
I would choose SQL for this system because the data is highly structured and relies on strict relationships. A school database requires strict data integrity to ensure students are only enrolled in courses that actually exist and that duplicate enrolments are prevented. SQL's relational structure and foreign key constraints enforce these rules perfectly, whereas NoSQL is better suited for unstructured or rapidly changing document data.