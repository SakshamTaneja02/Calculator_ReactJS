import React,{useReducer} from 'react'
import { ACTION } from './App'
import OperationButton from './OperationButton'
import DigitButton from './DigitButton'
import './style.css'

let fact = (num) => {
  let p = 1 
  for(let i=1;i<=num;i++)
  {
    p=p*i
  }
  return p
}

function evaluate({prev, curr, operation}){
    const p = Number.parseFloat(prev)
    const c = Number.parseFloat(curr)
    if(operation==="!")
    {
      if(isNaN(p)) return ""
      else {
        return fact(p).toString()
      }
    }
    if(operation==="log2")
    {
      if(isNaN(c)) return ""
      else{
        return (Math.log(c)/Math.log(2)).toString()
      }
    }
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
      case "^":
        comp = Math.pow(p,c)
        break;
      case "%":
        comp = p%c
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
        if(payload.digit === "." && state.curr.includes(".")) return state
        return {
          ...state,
          curr: `${state.curr || ""}${payload.digit}`
        }
      case ACTION.CHOOSE_OPERATION:
        if(state.curr==null && state.prev==null){
          if(payload.operation !== "log2"){
            return state
          }
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
        if(state.operation==="log2" && state.curr!==null)
        {
          return {
            ...state,
            curr: evaluate(state),
            prev: null,
            operation: null,
          }
        }
        if(state.prev == null || state.operation == null){
          return state
        }
        else if(state.prev!==null && (state.operation === "!")){
          return {
            ...state,
            overwrite: true,
            prev: null,
            curr: evaluate(state),
            operation: null
          }
        }
        else if(state.prev == null || state.curr == null || state.operation==null){
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
      case ACTION.PIE:
        if(state.prev == null){
          return{
            ...state,
            prev:Math.PI.toString(),
            curr: null,
            operation:null 
          }
        }
        else if(state.operation==null) return state
        return {
          ...state,
          prev:state.prev,
          operation: state.operation,
          curr:Math.PI.toString(),
        }
      case ACTION.EXPO:
        let temp = 2.718281828459045
        if(state.prev == null){
          return{
            ...state,
            prev:temp.toString(),
            curr: null,
            operation:null 
          }
        }
        else if(state.operation==null) return state
        return {
          ...state,
          prev:state.prev,
          operation: state.operation,
          curr:temp.toString(),
        }
      default:
        return state
    }
  }

function MiniCal2() {
  
    const [{curr, prev, operation}, dispatch] = useReducer(reducer,{})
    return (
    <div className='calculator-grid-2'>
      <div className="output">
        <div className="previous-operand">{prev} {operation}</div>
        <div className="current-operand">{curr}</div>
      </div>
      <button className="span-two" onClick={() => {dispatch({type: ACTION.CLEAR})}}>AC</button>
      <button onClick={() => {dispatch({type:ACTION.DELETE_DIGIT})}}>DEL</button>
      <OperationButton operation={"/"} dispatch={dispatch} />
      <OperationButton operation={"log2"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <OperationButton operation={"^"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <OperationButton operation={"%"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"!"} dispatch={dispatch}/>
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button className="span-two" onClick={() => {dispatch({type:ACTION.EVALUATE})}}> = </button>
      <button onClick={() => {dispatch({type:ACTION.PIE})}}> π </button>
      <button onClick={() => {dispatch({type:ACTION.EXPO})}}> e </button>
    </div>
  )
}

export default MiniCal2
