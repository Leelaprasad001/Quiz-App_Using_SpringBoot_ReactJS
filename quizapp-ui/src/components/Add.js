import React, { useState } from 'react';
import { Container, Header, Segment, Grid, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../Constants';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

const Add = () => {
  const [questionData, setQuestionData] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultyLevel: '',
    category: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e, { name, value }) => {
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await instance.post('/question/add', questionData);
      if (response.status === 201) {
        setResponseMessage('Question added successfully');
        setQuestionData({
          questionTitle: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          rightAnswer: '',
          difficultyLevel: '',
          category: '',
        });
      }
    } catch (error) {
      setResponseMessage('Error adding question');
    }
  };

  const difficultyOptions = [
    { key: 'easy', value: 'Easy', text: 'Easy' },
    { key: 'medium', value: 'Medium', text: 'Medium' },
    { key: 'hard', value: 'Hard', text: 'Hard' },
  ];

  const categoryOptions = [
    { key: 'java', value: 'java', text: 'Java' },
    { key: 'python', value: 'python', text: 'Python' },
  ];

  return (
    <Container className="learn">
      <Grid columns={2} verticalAlign="middle">
        <Grid.Column width={8}>
          <Header as="h1">Add Questions</Header>
        </Grid.Column>
      </Grid>
      <Segment>
        {responseMessage && (
            <Message positive={responseMessage === 'Question added successfully'} negative={responseMessage === 'Error adding question'}>
                <Message.Header>{responseMessage}</Message.Header>
            </Message>
            )}
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Question Title"
            placeholder="Enter the question"
            value={questionData.questionTitle}
            name="questionTitle"
            onChange={handleInputChange}
          />
          {[1, 2, 3, 4].map((num) => (
            <Form.Input
              key={num}
              label={`Option ${num}`}
              placeholder={`Enter option ${num}`}
              value={questionData[`option${num}`]}
              name={`option${num}`}
              onChange={handleInputChange}
            />
          ))}
          <Form.Input
            label="Right Answer"
            placeholder="Enter the right answer"
            value={questionData.rightAnswer}
            name="rightAnswer"
            onChange={handleInputChange}
          />
          <Form.Select
            label="Difficulty Level"
            options={difficultyOptions}
            placeholder="Select the difficulty level"
            value={questionData.difficultyLevel}
            name="difficultyLevel"
            onChange={handleInputChange}
          />
          <Form.Field>
            <label>Category</label>
            <Dropdown
              placeholder="Select category"
              selection
              options={categoryOptions}
              value={questionData.category}
              name="category"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button primary type="submit">Submit</Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default Add;
