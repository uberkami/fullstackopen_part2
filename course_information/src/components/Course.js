import React from 'react'

const Header2 = ({ title }) => {
    console.log('header')
    return (
      <div>
        <h2>
          {title}
        </h2>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    console.log("console: Content: ", course[0]);
    const courseCont = course.map((c) => {
      return (
        <div key={c.id}>
          <Header2 title={c.name} />
          <Content course={c} />
          <Total course={c} />
        </div>
      )
    }
    )
  
    return courseCont
  }
  
  const Total = ({ course }) => {
    console.log("course: ", course)
    console.log("course.parts.length: ", course.parts.length)
  
    const total = course.parts.reduce((sum, exercise) => sum + exercise.exercises, 0)
  
    return (
      <div>
        <p><strong>total of {total} exercises</strong></p>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    console.log('course')
    for (let i = 0; i < course.parts.length; i++) {
      console.log(course.parts[i].name)
    }
    const courseList = course.parts.map((c) => <p key={c.id}>{c.name} {c.exercises}</p>)
  
    return (
      <>
        {courseList}
      </>
    )
  }
  
  export default Course