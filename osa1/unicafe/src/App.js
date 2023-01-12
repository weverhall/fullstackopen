import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  if (props.goodReviews + props.neutralReviews + props.badReviews === 0) {
    return (
      <p>No feedback yet!</p>
    )
  }
  else {
  return (
  <table>
    <tbody>
    <StatisticLine text="good" value ={props.goodReviews} />
    <StatisticLine text="neutral" value ={props.neutralReviews} />
    <StatisticLine text="bad" value ={props.badReviews} />
    <StatisticLine text="all" value ={props.goodReviews + props.neutralReviews + props.badReviews} />
    <StatisticLine text="average" value ={(props.goodReviews + (-1 * props.badReviews))/(props.goodReviews + props.badReviews + props.neutralReviews)} />
    <StatisticLine text="positive" value ={`${props.goodReviews / (props.goodReviews + props.badReviews + props.neutralReviews) * 100} %`} />
    </tbody>
  </table>
  )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button
       handleClick={incrementGood}
       text="good"
       />
      <Button
       handleClick={incrementNeutral}
       text="neutral"
       />
      <Button
       handleClick={incrementBad}
       text="bad"
       />

      <h2>Statistics</h2>
      <Statistics
      goodReviews={good}
      neutralReviews={neutral}
      badReviews={bad}
      />
    </div>
  )
}

export default App
