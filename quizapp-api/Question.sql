--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id integer NOT NULL,
    question_title text NOT NULL,
    option1 text NOT NULL,
    option2 text NOT NULL,
    option3 text NOT NULL,
    option4 text NOT NULL,
    right_answer text NOT NULL,
    difficulty_level text NOT NULL,
    category text NOT NULL
);


ALTER TABLE public.question OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.quiz OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_id_seq OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_questions (
    quiz_id integer NOT NULL,
    questions_id integer NOT NULL
);


ALTER TABLE public.quiz_questions OWNER TO postgres;

--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, question_title, option1, option2, option3, option4, right_answer, difficulty_level, category) FROM stdin;
1	What is a class in Java?	A function	An object	A data structure	A loop	An object	Easy	java
2	What does OOP stand for?	Object-Oriented Programming	Object Ordering Process	Operating Overloaded Pointers	Order of Operations	Object-Oriented Programming	Easy	java
3	What is a list in Python?	A type of loop	A built-in function	A data structure	An object	A data structure	Easy	python
4	Which data structure uses First-In-First-Out (FIFO) order?	Stack	Queue	Array	LinkedList	Queue	Medium	python
5	What is a constructor?	A member of a class	A loop in Python	A data type	A special method	A special method	Medium	java
6	Which sorting algorithm has the worst-case time complexity of O(n^2)?	Merge Sort	Quick Sort	Insertion Sort	Bubble Sort	Bubble Sort	Hard	python
7	In Java, what is used to create an instance of a class?	Class	Method	Object	Constructor	Constructor	Easy	java
8	Which keyword is used to define a variable that won’t be reassigned?	static	final	constant	immutable	final	Easy	java
9	What is the output of 4 ^ 3 in Python?	7	64	81	12	64	Easy	python
10	What does the term "polymorphism" refer to in programming?	Using multiple inheritance	Ability to take multiple forms	Manipulating data	Using multiple programming languages	Ability to take multiple forms	Medium	java
11	What is the purpose of the "self" parameter in Python class methods?	It refers to the current instance of the class	It is used to call parent class methods	It is a keyword for loops	It is a data type	It refers to the current instance of the class	Medium	python
12	Which of the following is not a primitive data type in Java?	int	boolean	char	string	string	Medium	java
13	What is the time complexity of a binary search?	O(n)	O(log n)	O(n^2)	O(1)	O(log n)	Medium	python
14	What keyword is used to inherit a class in Python?	extends	inherits	super	class	class	Easy	python
15	Which type of loop is ideal for situations where the number of iterations is known?	for loop	while loop	do-while loop	until loop	for loop	Easy	java
16	What is the purpose of "import" in Python?	To export data	To create a backup	To include external modules	To print output	To include external modules	Easy	python
17	In Java, which access modifier provides the widest visibility?	public	private	protected	package-private	public	Easy	java
18	What is a lambda function in Python?	A function that uses the "lambda" keyword	A function with multiple return values	A function with no parameters	An anonymous inline function	An anonymous inline function	Medium	python
19	What is a linked list?	A type of array	A linear data structure	A collection of objects	A group of classes	A linear data structure	Medium	java
20	Which operator is used to concatenate strings in Python?	&	+	*	++	+	Easy	python
21	What does JVM stand for?	Java Virtual Machine	Just Virtual Memory	JavaScript Virtual Machine	Java Version Manager	Java Virtual Machine	Easy	java
22	In Python, what is the main difference between a tuple and a list?	Tuples are mutable, lists are not	Lists are ordered, tuples are not	Tuples can store mixed data types, lists cannot	Lists have a fixed size, tuples do not	Tuples can store mixed data types, lists cannot	Medium	python
23	What is the purpose of the "finally" block in a try-catch-finally statement?	To handle exceptions	To define a fallback value	To execute code regardless of exceptions	To terminate the program	To execute code regardless of exceptions	Medium	java
24	What is a dictionary in Python?	A sorted collection of elements	A data structure used for searching	An ordered sequence of elements	A key-value store	A key-value store	Easy	python
25	Which keyword is used to define a subclass in Java?	child	extends	inherits	subclass	extends	Easy	java
26	What is the purpose of the "pass" statement in Python?	To stop the execution of a loop	To indicate an empty code block	To raise an exception	To terminate the program	To indicate an empty code block	Easy	python
28	which among the following is example of inheritance	single	double	Triple	none	single	Easy	java
\.


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz (id, title) FROM stdin;
1	Leela
2	prasad
6	myquiz
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_questions (quiz_id, questions_id) FROM stdin;
1	10
1	25
1	15
1	5
1	7
2	14
2	4
2	26
6	10
6	23
6	5
\.


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 28, true);


--
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_id_seq', 6, true);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (id);


--
-- Name: quiz_questions fkcgp9e1c6ww3t383aui4w8feae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT fkcgp9e1c6ww3t383aui4w8feae FOREIGN KEY (quiz_id) REFERENCES public.quiz(id);


--
-- Name: quiz_questions fkpmfvwer12y1nrjc0efm04dq16; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT fkpmfvwer12y1nrjc0efm04dq16 FOREIGN KEY (questions_id) REFERENCES public.question(id);


--
-- PostgreSQL database dump complete
--

