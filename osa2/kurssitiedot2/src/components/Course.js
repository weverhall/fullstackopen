const Header = ({ courses }) => {
    return (
      <div>
        <h2>{courses.name}</h2>
      </div>
    )
  }
  
const Content = ({ courses }) => {
  return (
    <div>
      {courses.parts.map((courses) => 
        <Part key={courses.id} part={courses} />
      )}
    </div>
  )
}

const Total = ({ courses }) => {
  console.log("logs!", courses)
  const total = courses.parts.reduce(function(total, part) {
    return total + part.exercises}, 0)

  return (
    <p><b>total of {total} exercises</b></p>
  ) 
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

export default Course