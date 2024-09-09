import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { enrollInCourse } from '../redux/coursesSlice.js'; // Adjust the path as needed

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courseList);
  const [course, setCourse] = useState(null);

  console.log('Course ID from params:', id);
  console.log('Available courses:', courses);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const courseId = parseInt(id, 10); // Convert the id to a number
      const filteredCourses = courses.filter(course => course.id === courseId);
      if (filteredCourses.length > 0) {
        setCourse(filteredCourses[0]);
      } else {
        console.error('Course not found');
      }
    } else {
      console.error('Courses data is undefined or empty.');
    }
  }, [id, courses]);

  const handleEnroll = () => {
    if (course) {
      dispatch(enrollInCourse(course));
      console.log(`Enrolled in course with ID: ${id}`);
    } else {
      console.error('No course selected for enrollment.');
    }
  };

  return (
    <div>
      {course ? (
        <>
          <h2>{course.name}</h2>
          <img src={course.thumbnail} alt={course.name} />
          <p>Instructor: {course.instructor}</p>
          <p>Description: {course.description}</p>
          <button onClick={handleEnroll}>Enroll</button>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetail;
