import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));


export default function ChooseQuiz({
  setDifficulty,
  difficulty,
  NOQuestions,
  setNOQuestions,
  type,
  setType
 }) {
  const classes = useStyles()
  
  
  const handleRadioLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty((event.target as HTMLInputElement).value);
  };
  const handleNOQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNOQuestions((event.target as HTMLInputElement).value)
  }
  const handleRadioTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset"  className={classes.formControl}>
        <FormLabel component="legend" >Choose The Difiiculty Level: </FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={difficulty} onChange={handleRadioLevelChange}>
          <FormControlLabel value="easy" control={<Radio />} label="Easy" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="hard" control={<Radio />} label="Hard" />
        </RadioGroup>
        <TextField value={NOQuestions} style={{margin: '1.2rem 0'}} label="Number of questions?" onChange={handleNOQuestionChange} />

        <FormLabel component="legend">Choose The Difiiculty Level: </FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={type} onChange={handleRadioTypeChange}>
          <FormControlLabel value="multiple" control={<Radio />} label="Multiple Choice" />
          <FormControlLabel value="boolean" control={<Radio />} label="True/False" />
        </RadioGroup>

        
      </FormControl>      
    </form>
  )
}
