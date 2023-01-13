import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={handleClick}>
  {text}
  </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({ goodReviews, neutralReviews, badReviews}) => {
  if (goodReviews + neutralReviews + badReviews === 0) {
    return (
      <p>No feedback yet!</p>
    )
  }
  else {
  return (
  <table>
    <tbody>
    <StatisticLine text="good" value={goodReviews} />
    <StatisticLine text="neutral" value={neutralReviews} />
    <StatisticLine text="bad" value={badReviews} />
    <StatisticLine text="all" value={goodReviews + neutralReviews + badReviews} />
    <StatisticLine text="average" value={(goodReviews + (-1 * badReviews))/(goodReviews + badReviews + neutralReviews)} />
    <StatisticLine text="positive" value={`${goodReviews / (goodReviews + badReviews + neutralReviews) * 100} %`} />
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
