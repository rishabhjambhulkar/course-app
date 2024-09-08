import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCourse, enrollInCourse } from '../redux/coursesSlice.js'; // Adjust the path as needed

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courseList);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Find the course by ID from the Redux store
    const foundCourse = courses.find(course => course.id === id);

    console.log(foundCourse)
    setCourse(foundCourse);
  }, [id, courses]);

  const handleEnroll = () => {
    console.log(course)
    dispatch(enrollInCourse(course));
    console.log(`Enrolled in course with ID: ${id}`);
  };
  

  if (!course) return <p>Loading...</p>; // Show loading state while fetching course

  return (
    <div>
      <h2>{course.name}</h2>
      <img src={course.thumbnail} alt={course.name} />
      <p>{course.instructor}</p>
      <p>{course.description}</p>
      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
};

export default CourseDetail;
