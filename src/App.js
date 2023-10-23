import {useState} from 'react'
import React from 'react'
import MiniCal2 from "./MiniCal2";
import MiniCal from './MiniCal';

export const ACTION = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
  PIE: 'pie',
  EXPO: 'expo'
}

function App() {
  const [expand,setExpand] = useState(false)
  return (
    <div>
      <div className="expand"><button onClick={() => {setExpand(prev => !prev)}}>Expand</button></div>
      {!expand && <MiniCal/>}
      {expand && <MiniCal2/>}
    </div>
  );
}

export default App;
