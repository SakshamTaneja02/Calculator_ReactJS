import React,{useReducer} from 'react'
import { ACTION } from './App'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import './style.css'

function evaluate({prev, curr, operation}){
    const p = Number.parseFloat(prev)
    const c = Number.parseFloat(curr)
    if(isNaN(p) || isNaN(c)) return ""
    let comp = ""
    switch(operation){
      case "+":
        comp = p + c
        break
      case "-":
        comp = p-c
        break
      case "*":
        comp = p*c
        break
      case "/":
        comp = p/c
        break
      default:
        comp = ""
      }
      return comp.toString()
  }
  
  function reducer(state, { type , payload }) {
    switch(type){
      case ACTION.ADD_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            curr: payload.digit,
            overwrite: false
          }
        }
        if(payload.digit === "0" && state.curr === "0") return state
        if(payload.digit==="." && state.curr==null){
          return {...state,
          curr: `${state.curr || ""}${payload.digit}`}
        }
        if(payload.digit === "." && state.curr.includes(".")) {
          return state
        }
        return {
          ...state,
          curr: `${state.curr || ""}${payload.digit}`
        }
      case ACTION.CHOOSE_OPERATION:
        if(state.curr==null && state.prev==null){
          return state
        }
        if(state.curr == null){
          return {
            ...state,
            operation: payload.operation,
  
          }
        }
        if(state.prev == null){
          return {
            ...state,
            operation: payload.operation,
            prev: state.curr,
            curr: null
          }
        }
        return {
          ...state,
          prev: evaluate(state),
          curr: null,
          operation: payload.operation
        }
      case ACTION.CLEAR:
        return {}
      case ACTION.EVALUATE:
        if(state.prev == null || state.curr == null || state.operation == null){
          return state
        }
        return{
          ...state,
          overwrite: true,
          prev: null,
          curr: evaluate(state),
          operation:null,
        }
      case ACTION.DELETE_DIGIT:
        if(state.overwrite){
          return {
            overwrite: false,
            curr: null
          }
        }
        if(state.curr == null){
          return state
        }
        if(state.curr.length === 1){
          return{
            ...state,
            curr: null
          }
        }
        return {
          ...state,
          curr: state.curr.slice(0,-1)
        }
      default:
        return state
    }
  }

function MiniCal() {
  
    const [{curr, prev, operation}, dispatch] = useReducer(reducer,{})

    return (
    <div className='calculator-grid'>
      <div className="output">
        <div className="previous-operand">{prev} {operation}</div>
        <div className="current-operand">{curr}</div>
      </div>
      <button className="span-two" onClick={() => {dispatch({type: ACTION.CLEAR})}}>AC</button>
      <button onClick={() => {dispatch({type:ACTION.DELETE_DIGIT})}}>DEL</button>
      <OperationButton operation={"/"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button className="span-two" onClick={() => {dispatch({type:ACTION.EVALUATE})}}> = </button>
    </div>
  )
}

export default MiniCal
