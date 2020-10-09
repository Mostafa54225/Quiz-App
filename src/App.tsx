import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fethcQuizQuestions, QuestionState } from './api'
import ChooseQuiz from './components/ChooseQuiz';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

export type AnswerObject = {
  question: string;
  answer: string,
  correct: boolean,
  correctAnswer: string
}
function App() {
  // const TOTAL_QUESTION = 10

  const [difficulty, setDifficulty] = useState('')
  const [NOQuestions, setNOQuestions] = useState(1)
  const [type, setType] = useState('')

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [end, setEnd] = useState(true)

  const startQuiz = async () => {
    try {
      setLoading(true) 
      setEnd(false)
      setQuestions(await fethcQuizQuestions(NOQuestions, difficulty, type))  
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const nextQuestion = () => {
    if(number + 1 === NOQuestions) {setEnd(true)}
    else {setNumber(number + 1)}
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!end) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if(correct){ 
        setScore(prev => prev + 1) 
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    } 
  }

  return (
    <div className="App">
      <h1 style={{display:"flex", justifyContent:"center"}}>Quiz App</h1>
      <ChooseQuiz 
        setDifficulty={setDifficulty} 
        difficulty={difficulty} 
        NOQuestions={NOQuestions} 
        setNOQuestions={setNOQuestions}
        type={type}
        setType={setType}
      />

      {end && difficulty && NOQuestions && type? (
        <Button variant="outlined" color="primary" onClick={startQuiz}>
          Start
        </Button>) : null}
      {/* {(userAnswers.length === +NOQuestions) ? 
        (<Button variant="outlined" color="primary" onClick={startQuiz}>
          Quiz Again
        </Button>) : null} */}
      {end ? null: <p className="score">Score: {score}</p>}
      {loading? <div className=""> <CircularProgress color="secondary" /></div>: null}
      
      {!loading && !end &&(
          
          <QuestionCard 
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number]: undefined}
            questionNumber={number + 1}
            totalQuestion={NOQuestions}
          />
      )}

      {!loading && !end && userAnswers.length === number + 1 && number !== NOQuestions - 1 
      ? (
      <Button variant="outlined" color="primary" style={{display:"flex", justifyContent:"center", aligntItem:"center", margin:"1rem 0"}} onClick={nextQuestion}>
        Next Question
      </Button>): null}
    </div>
  );
}

export default App;
