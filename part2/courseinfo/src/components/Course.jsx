const Course = ({course}) => {
	return (
	  <div>
		 <Header course = {course} />
		 <Content course = {course}/>
		 <Total course = {course} />
	  </div>
	)
 }
 
 const Header = ({course}) =>{
	return (
	  <h1>{course.name}</h1>
	)
 }
 
 const Content = ({course})=>{
	return (
	  <div>
	  {
		 course.parts.map((part) =>(
			<Part key={part.id} name={part.name} exercises={part.exercises} />
		 ))
	  }
	  </div>
	)
 }

 const Part = ({name, exercises}) =>{
	return (
	  <p>{name} {exercises}</p>
	)
 }
 
 const Total = ({course}) =>{
	return (
	  <p>Number of exercises {
		 course.parts.reduce((sum, part) => sum + part.exercises, 0)
	  }</p>
	)
 }

 export default Course