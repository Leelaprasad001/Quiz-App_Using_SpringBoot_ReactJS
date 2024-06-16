// src/App.js
import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Header, Button,Grid } from 'semantic-ui-react';
import Learn from './components/Learn';
import Attempt from './components/Attempt';
import Add from './components/Add';

const App = () => {
  return (
    <Router>
      <Container className="container">
        <Grid className="grid">
          <Grid.Row >
            <Grid.Column >
              <Header as="h1" className="header1" style={{ marginBottom: '2rem' }}>
                Quiz App
              </Header>
              
              <Button as={Link} to="/Learn" primary>
                Learn
              </Button>
              <Button as={Link} to="/Attempt" secondary>
                Attempt Quiz
              </Button>
              <Button as={Link} to="/Add" secondary>
                Add Questions
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Routes>
            <Route path="/Learn" element={<Learn />} />
            <Route path="/Attempt" element={<Attempt />} />
            <Route path="/Add" element={<Add />} />
            <Route path="/" element={<Learn/>} />
          </Routes>
        </Grid>
      </Container>
    </Router>
  );
};

export default App;

// http://localhost:8080/quiz/create?category=java&numQ=5&title=JQuiz
// http://localhost:8080/quiz/get/1
// http://localhost:8080/quiz/submit/1
// [
//   {
//       "id":1,
//       "response":"An object"
//   },
//   {
//       "id":5,
//       "response":"A special method"
//   },
//   {
//       "id":10,
//       "response":"Ability to take multiple forms"
//   },
//   {
//       "id":19,
//       "response":"A linear data structure"
//   },
//   {
//       "id":23,
//       "response":"To execute code regardless of exceptions"
//   }
// ]