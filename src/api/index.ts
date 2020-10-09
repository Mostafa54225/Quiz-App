import axios from 'axios'


export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
}


export type QuestionState = Question & {answers: string[]}
export const fethcQuizQuestions = async (amount: number, difficulty, type) => {
  const EndPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
  try {
    const {data: {results} } = await axios.get(EndPoint);
    return results.map((question: Question) => (
      {
        ...question,
        answers: shuffleArray([question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5))
      }
    ))
  } catch (error) {
    console.log(error)
  }
}


const shuffleArray = (array: string[]) => [...array]