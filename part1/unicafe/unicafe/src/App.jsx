import { useState } from 'react'

const Button = ({setFunc, text, state}) => {

  const handleClick = (setFunc, state) => {
    return () => {
      setFunc(state + 1);
    }
  }

  return (
    <>
      <button onClick={handleClick(setFunc, state)}>
        {text}
      </button>
    </>
  )
}

const Statistics = (props) => {

  if (props.total !== 0){
    return (
      // <>
      // <p>good {props.good}</p>
      // <p>neutral {props.neutral}</p>
      // <p>bad {props.bad}</p>
      // <p>all {props.total}</p>
      // <p>average {props.average}</p>
      // <p>positive {(props.positive * 100)}%</p>
      // </>
      <>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{props.good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{props.neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{props.bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{props.total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{props.average.toFixed(1)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(props.positive * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
    <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button setFunc={setGood} text="good" state={good} />
      <Button setFunc={setNeutral} text="neutral" state={neutral} />
      <Button setFunc={setBad} text="bad" state={bad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App