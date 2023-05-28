import React from 'react'

const StatsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}
  
const Stats = ({ goodReviews, neutralReviews, badReviews }) => {
    if (goodReviews + neutralReviews + badReviews === 0) {
      return (
        <p>no feedback given yet!</p>
      )
    } else {
      return (
        <table>
          <tbody>
          <StatsLine text="good" value={goodReviews} />
          <StatsLine text="ok" value={neutralReviews} />
          <StatsLine text="bad" value={badReviews} />
          </tbody>
        </table>
      )
    }
}

export default Stats