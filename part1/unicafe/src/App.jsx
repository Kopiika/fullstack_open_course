import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}:</td><td>{value}</td>
    </tr>
)

const Statistics = (props) =>{
  const total = props.allClicks.length
  const sum = props.allClicks.reduce((sum, num)=> sum + num, 0)
  const average = total === 0 ? 0 : sum/total
  const positive = total === 0 ? 0 : (props.good/total)*100

  if (total === 0){
    return (
      <div>
        No feedback given.
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text = "Good" value ={props.good}/>
          <StatisticLine text = "Neutral" value ={props.neutral}/>
          <StatisticLine text = "Bad" value ={props.bad}/>
          <StatisticLine text = "All" value ={total}/>
          <StatisticLine text = "Average" value ={average.toFixed(2)}/>
          <StatisticLine text = "Positive" value ={`${positive.toFixed(1)} %`}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [allClicks, setAll] = useState([])

  const [good, setGood] = useState(0)
  const handleClickGood = () => {
    setAll(allClicks.concat(1))
    setGood (good + 1)
  }

  const [neutral, setNeutral] = useState(0)
  const handleClickNeutral = () => {
    setAll(allClicks.concat(0))
    setNeutral (neutral + 1)
  }

  const [bad, setBad] = useState(0)
  const handleClickBad = () => {
    setAll(allClicks.concat(-1))
    setBad (bad + 1)
  }

  
  return (
    <div>
      <h2>Give feedback</h2>

      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />

      <h2>Statistics</h2>
      <Statistics allClicks={allClicks}
                  good={good}
                  neutral={neutral}
                  bad={bad}/>

    </div>
  )
}

export default App