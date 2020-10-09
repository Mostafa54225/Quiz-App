import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  max-width: 1100px;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0,0,0,.25);
  text-align: center;
  
  p{
    font-size: 1rem;
  }
`

type ButtomWrapperProps = {
  correct: boolean;
  userClicked: boolean;
}

export const ButtomWrapper = styled.div<ButtomWrapperProps>`
  transition: all .4s ease;
  :hover {
    opacity: .8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 1.1rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) => correct ? `#1E90FF`: !correct && userClicked ? `red`: `#fff`};
    color: #000;
    border: 2px solid #0085a3;
  }
`

