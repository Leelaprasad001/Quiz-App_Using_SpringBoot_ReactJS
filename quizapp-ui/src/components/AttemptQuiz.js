import React, { useState, useEffect } from 'react'
import { Button,  Modal, Form, Message, Segment, Header  } from 'semantic-ui-react'
import axios from 'axios';
import { config } from '../Constants';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});


function AttemptQuiz({ quizId, quizTitle, handleAttemptClick }) {
    const [open, setOpen] = React.useState(false)
    const [quizData, setQuizData] = useState('');
    const [responses, setResponses] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [marks, setMarks] = useState(null);
  
    useEffect(() => {
        if (open) {
          fetchQuizDetails(quizId);
        }
      }, [open, quizId]);
    
      const fetchQuizDetails = async (quizId) => {
        try {
          const response = await instance.get(`/quiz/get/${quizId}`);
          if (response.status === 200) {
            setQuizData(response.data);
            const initialResponses = response.data.map((question) => ({
              id: question.id,
              response: null,
            }));
            setResponses(initialResponses);
          }
        } catch (error) {
          console.log('Failed to fetch quiz details');
        }
      };
    
      const handleResponseChange = (questionId, selectedOption) => {
        const updatedResponses = responses.map((response) =>
          response.id === questionId ? { ...response, response: selectedOption } : response
        );
        setResponses(updatedResponses);
      };
    
    
      const handleSubmit = async () => {
        try {
            
          const filteredResponses = responses.filter((response) => response.response !== null);
          const response = await instance.post(`/quiz/submit/${quizId}`, filteredResponses);
          if (response.status === 200) {
            setMarks(response.data);
            setSubmitted(true);
          }
        } catch (error) {
          console.error('Failed to submit quiz', error);
        }
      };

    return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button secondary>Attempt Quiz</Button>}
    >
        <Modal.Header>{`Quiz Details : ${quizId} - ${quizTitle}`}</Modal.Header>
       
        <Modal.Content>
            {quizData.length === 0 ? (
            <p>Loading...</p>
            ) : (quizData.map((question) => (
            <Segment key={question.id} style={{ marginBottom: '20px' }}>
                <Header as="h3">{question.questionTitle}</Header>
                { <Form>
                <Form.Group grouped>
                    <Form.Radio
                    label={question.option1}
                    value={question.option1}
                    checked={responses.find((response) => response.id === question.id)?.response === question.option1}
                    onChange={() => handleResponseChange(question.id, question.option1)}
                    />
                    <Form.Radio
                    label={question.option2}
                    value={question.option2}
                    checked={responses.find((response) => response.id === question.id)?.response === question.option2}
                    onChange={() => handleResponseChange(question.id, question.option2)}
                    />
                    <Form.Radio
                    label={question.option3}
                    value={question.option3}
                    checked={responses.find((response) => response.id === question.id)?.response === question.option3}
                    onChange={() => handleResponseChange(question.id, question.option3)}
                    />
                    <Form.Radio
                    label={question.option4}
                    value={question.option4}
                    checked={responses.find((response) => response.id === question.id)?.response === question.option4}
                    onChange={() => handleResponseChange(question.id, question.option4)}
                    />
                </Form.Group>
                </Form> }
            </Segment>
            )))}
      </Modal.Content>
      <Modal.Actions>
      {!submitted ? (
            <Button color="black" onClick={() => setOpen(false)}>
            Close Quiz
            </Button>
        ) : (
            <>
            <Message positive>
                <Message.Header>{`You scored ${marks} marks`}</Message.Header>
            </Message>
            <Button color="black" onClick={() => setOpen(false)}>
                Close Quiz
            </Button>
            </>
        )}
        {!submitted && (
            <Button primary onClick={handleSubmit}>
            Submit Quiz
            </Button>
        )}
      </Modal.Actions>
    </Modal>
  )
}

export default AttemptQuiz;
