const prod = {
  url: {
   API_BASE_URL: 'http://localhost:8088/quizapp-0.0.1-SNAPSHOT',
   
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://localhost:8080'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod