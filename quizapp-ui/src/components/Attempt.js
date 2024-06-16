import React, { useState, useEffect } from 'react';
import { Container, Header, Segment, Form, Button, Message, Table } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../Constants';
import AttemptQuiz from './AttemptQuiz';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

const Attempt = () => {
  const [category, setCategory] = useState('');
  const [numQ, setNumQ] = useState('');
  const [title, setTitle] = useState(''); 
  const [responseMessage, setResponseMessage] = useState('');
  const [quizes, setQuizzes] = useState([]);
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const response = await instance.get('/quiz/allquizes');
      setQuizzes(response.data); 
    } catch (error) {
      console.error('Failed to fetch quizzes', error);
    }
  };

  const createQuiz = async () => {
    try {
      const response = await instance.post(`/quiz/create?category=${category}&numQ=${numQ}&title=${title}`);
      if (response.status === 201) {
        setResponseMessage('Quiz created successfully');
        fetchAllQuizzes();
        setCategory('');
        setNumQ('');
        setTitle('');
      } 
    } catch (error) {
      setResponseMessage('Failed to create quiz');
    }
  };

  const handleAttemptClick = (quizId) => {
    setSelectedQuizId(quizId);
    setOpenQuizModal(true);
  };

  const deleteQuiz = async (quizId) => {
    try {
      const response = await instance.delete(`/quiz/delete/${quizId}`);
      if (response.status === 200) {
        setResponseMessage('Quiz deleted successfully');
        fetchAllQuizzes(); 
      }
    } catch (error) {
      setResponseMessage('Failed to delete quiz');
    }
  };

  return (
    <Container className="attempt-quiz">
      <Header as="h1">Create Quiz</Header>
      <Segment>
        {responseMessage && (
            <Message positive={responseMessage === 'Quiz created successfully'} negative={responseMessage === 'Error in Quiz creation'}>
                <Message.Header>{responseMessage}</Message.Header>
            </Message>
            )}
        <Form>
          <Form.Input
            label="Category"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Form.Input
            label="Number of Questions"
            placeholder="Enter Number of Questions"
            value={numQ}
            onChange={(e) => setNumQ(e.target.value)}
          />
          <Form.Input
            label="Title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Button to create quiz */}
          <Button primary onClick={createQuiz}>
            Create Quiz
          </Button>
        </Form>
      </Segment>
      <Segment>
        <Header as="h1">All Quizzes</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Quiz Id</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {quizes.map((quiz) => (
              <Table.Row key={quiz.id}>
                <Table.Cell>{quiz.id}</Table.Cell>
                <Table.Cell>{quiz.title}</Table.Cell>
                <Table.Cell>
                  <AttemptQuiz
                    quizId={quiz.id}
                    quizTitle={quiz.title}
                    open={openQuizModal && selectedQuizId === quiz.id}
                    setOpen={setOpenQuizModal}
                    handleAttemptClick={handleAttemptClick}
                  />

                  <Button onClick={() => deleteQuiz(quiz.id)}>
                        Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </Container>    
  );
};

export default Attempt;

