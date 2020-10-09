import axios from 'axios'


export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
}
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}
export enum Type {
  BOOLEAN = "boolean",
  MULTIPLE = "multiple"
}

export type QuestionState = Question & {answers: string[]}
export const fethcQuizQuestions = async (amount: number, difficulty: Difficulty, type: Type) => {
  const EndPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
  try {
    const {data: {results} } = await axios.get(EndPoint);
    return results.map((question: Question) => (
      {
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }
    ))
  } catch (error) {
    console.log(error)
  }
}


const shuffleArray = (array: string[]) => [...array]