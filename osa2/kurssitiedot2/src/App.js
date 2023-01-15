const Header = ({ courses }) => {
  return (
    <div>
      <h1>{courses.name}</h1>
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

const Courses = ({ courses }) => {
  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

const App = () => {
  const courses = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App