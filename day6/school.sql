-- CREATE TABLE statements
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE enrolments (
    student_id INT,
    course_id INT,
    grade TEXT,
    -- The composite primary key prevents a student from enrolling in the same course twice
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- INSERT statements (4 students so one has no enrolments, 3 courses, 5 enrolments)
INSERT INTO students (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('Diana Prince', 'diana@example.com');

INSERT INTO courses (title) VALUES
('Database Design'),
('Web Development'),
('Python Programming');

INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B'),
(2, 1, 'A'),
(2, 3, 'C'),
(3, 2, 'B');

-- QUERIES
-- 1. All courses for one student (by name)
SELECT courses.title
FROM courses
JOIN enrolments ON courses.course_id = enrolments.course_id
JOIN students ON enrolments.student_id = students.student_id
WHERE students.name = 'Alice Johnson';

-- 2. All students on one course
SELECT students.name
FROM students
JOIN enrolments ON students.student_id = enrolments.student_id
JOIN courses ON enrolments.course_id = courses.course_id
WHERE courses.title = 'Database Design';

-- 3. The number of students per course
SELECT courses.title, COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments ON courses.course_id = enrolments.course_id
GROUP BY courses.course_id;

-- 4. Students who have no enrolments
SELECT students.name
FROM students
LEFT JOIN enrolments ON students.student_id = enrolments.student_id
WHERE enrolments.student_id IS NULL;

-- 5. An update of one enrolment's grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 2 AND course_id = 3;