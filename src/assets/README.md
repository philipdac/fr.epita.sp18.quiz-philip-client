# QUIZ project

## User's stories
This project is to develop a web based program that helps in dealing with quiz assessments.
There are some user's stories that the program can address at the moment:

As a __TEACHER__, I would like to give examination to my students in a quiz format with following features:
- A quiz have many questions.
- A question can be:
    1. Answered by a single choice or
    2. Multiple choices or
    3. Open for student to write his/her own answer
- Questions can have difference score and evaluation method (automatic, manual), depending on their complexity.
- I can put an explanation or answer to each question to support evaluation process or student review after their examination.
- I can set time constraint to the quiz.
- I can define many examinations base on one quiz.
- I can control the status (attend-able, work submission only, completed) of the examination.
- I can shuffle:
    1. Questions in the quiz
    2. Both questions in the quiz and choices in the question
- My students can take an examination base on a secrete code that I disclose to them

As a __STUDENT__, I would like to:
- Take the examination with a "room code" that I get from my teacher. My email address and the room code are all I need to take the exam.
- In case that I refresh the page or close my web browser accidentally, I can get back to the place what I have just done.

## How to install & run the program
__Steps to run the project:__

- Download file "/target/quiz-philip-0.0.1.jar" to your computer
- Run the application by typing "__java -jar your_folder\quiz-philip-0.0.1.jar__" in your command prompt
- Visit url localhost:8080 and follow on-screen instructions
- The application creates a quiz with some questions as the sample for your test. Every time you restart the application, the database is reset back to this sample data.

## UML Class Diagram
![ULM Class Diagram](./umldiagram.png)

## API References

1. /api/quizzes?teacherId={teacherId}

        GET     list of quizzes defined by teacherId
        POST    create a new quiz

2. /api/quizzes/{quizId}

        GET     get the quiz defined by quizId
        PUT     save the quiz
        DELETE  delete the quiz defined by quizId

3. /api/questions?quizId={quizId}

        GET     list of questions of the quiz defined by quizId

3. /api/questions

        POST    create a new question

4. /api/questions/{questionId}

        GET     get the question defined by questionId
        PUT     save the question
        DELETE  delete the question defined by questionId

5. /api/exams?quizId={quizId}

        GET     list of exams of the quiz defined by quizId

6. /api/exams

        POST    create a new exam

7. /api/exams/{examId}

        GET     get the exams defined by examId
        PUT     save the exams
        DELETE  delete the exams defined by examId

8. /api/attendances

        POST    attend to an examination

9. /api/attendances/{attendanceId}/answer/{questionId}

        PUT    save the answer of student {attendanceId} to the {questionId}

## Application architecture
![Application architecture](./appdiagram.png)

- User interface is developed with Angular 7.0.4 and Angular Material components
- Back end is an API service developed in Java 8.0. It is a Maven project, built with Spring Boot version 2.1. Database for storage is H2 Database Engine in embedded mode.