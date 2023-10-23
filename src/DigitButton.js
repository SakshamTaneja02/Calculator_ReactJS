import {ACTION} from './App'
import React from 'react'

function DigitButton({dispatch, digit}) {
  return (
    <button 
    onClick={() => {dispatch({type:ACTION.ADD_DIGIT,payload:{digit}})}}>
    {digit}
    </button>
  )
}

export default DigitButton
