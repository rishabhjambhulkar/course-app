import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../redux/coursesSlice.js'; 
import db from '../db.json'; // Adjust the path accordingly

const CourseList = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = React.useState('');
 
  // useEffect(() => {
  //   fetch('http://localhost:3000/courses')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setCourses(data);
  //       data.forEach(course => dispatch(addCourse(course)));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching courses:', error);
  //     });
  // }, [dispatch]);


useEffect(() => {
  // Set the courses directly from the imported JSON
  setCourses(db.courses); // Assuming `db.json` contains a `courses` key
  db.courses.forEach(course => dispatch(addCourse(course)));
}, [dispatch]);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase()) || 
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by name or instructor" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="course-list">
        {filteredCourses.map(course => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <div className="course-card">
              <img src={course.thumbnail} alt={course.name} />
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
