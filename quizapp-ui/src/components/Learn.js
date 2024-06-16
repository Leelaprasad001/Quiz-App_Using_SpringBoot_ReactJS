import React, { useState, useEffect } from 'react';
import { Container, Header, Segment, Grid, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../Constants';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

const Learn = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'java', 'python']; // Define categories manually

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = '/question/allQuestions';
        if (selectedCategory !== 'All') {
          url = `/question/category/${selectedCategory}`;
        }
        const response = await instance.get(url);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const handleCategoryChange = (e, { value }) => {
    setSelectedCategory(value);
  };

  const categoryOptions = categories.map((category) => ({
    key: category.toLowerCase(),
    value: category,
    text: category,
  }));

  return (
    <Container className="learn">
       <Grid columns={2} verticalAlign="middle">
        <Grid.Column width={8}>
          <Header as="h1">Learn & Practice</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <Dropdown
            placeholder="Select Category"
            selection
            options={categoryOptions}
            onChange={handleCategoryChange}
            value={selectedCategory}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              {questions.map((question) => (
                <Segment key={question.id}>
                  <Header as="h3">{` ${question.questionTitle}`}</Header>
                  <p>
                    <strong>Answer:</strong>{' '}
                    <span style={{ color: 'green' }}>{`${question.rightAnswer}`}</span>
                  </p>
                </Segment>
              ))}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Learn;
