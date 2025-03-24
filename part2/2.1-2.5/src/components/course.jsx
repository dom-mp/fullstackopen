const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    const parts = props.parts;
    return (
      <>
        {parts.map(part => {
          return <Part key={part.id} part={part.name} exercises={part.exercises}/>
        })}
      </>
    )
  }
  
  const Total = (props) => {
    return (
      <p><strong>Total of {props.parts.reduce((acc, obj) => acc += obj.exercises, 0)} exercises</strong></p>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  
  const Course = (props) => {
    const course = props.course;
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course;