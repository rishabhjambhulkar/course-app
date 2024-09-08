import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Button, LinearProgress, Avatar, Divider } from '@mui/material';

// Dummy user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://via.placeholder.com/150',
  progress: 45, // Percentage of courses completed
};

const StudentDashboard = () => {
  const enrolledCourses = useSelector((state) => state.courses.enrolledCourses);
  const [completedCourses, setCompletedCourses] = useState([]);
  const dispatch = useDispatch();

  const handleMarkComplete = (id) => {
    // Find the course to mark as completed
    const completedCourse = enrolledCourses.find(course => course.id === id);
    
    // Add the course to the completedCourses state
    if (completedCourse) {
      setCompletedCourses(prev => [...prev, completedCourse]);
    }

    // Dispatch action to update the global state if necessary
    dispatch({ type: 'MARK_COURSE_COMPLETE', payload: id });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} gap={2}>
      {/* Left Bar: Enrolled Courses */}
      <Box flex={1}>
        <Typography variant="h4" gutterBottom>Your Enrolled Courses</Typography>
        {enrolledCourses.length === 0 ? (
          <Typography>No courses enrolled</Typography>
        ) : (
          <Box>
            {enrolledCourses.map((course) => (
              <Card key={course.id} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.thumbnail}
                  alt={course.name}
                />
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Instructor: {course.instructor}</Typography>
                  <Typography variant="body2" color="text.secondary">Due: {course.dueDate}</Typography>
                  <LinearProgress variant="determinate" value={course.progress} sx={{ my: 1 }} />
                  <Button onClick={() => handleMarkComplete(course.id)} variant="contained" color="primary">Mark as Completed</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Right Bar: Completed Courses */}
      <Box flex={1}>
        <Typography variant="h4" gutterBottom>Your Completed Courses</Typography>
        {completedCourses.length === 0 ? (
          <Typography>No courses completed</Typography>
        ) : (
          <Box>
            {completedCourses.map((course) => (
              <Card key={course.id} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.thumbnail}
                  alt={course.name}
                />
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Instructor: {course.instructor}</Typography>
                  <Typography variant="body2" color="text.secondary">Completed on: {course.completedDate}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* User Profile */}
      <Box flex={1} sx={{ maxWidth: 300, p: 2 }}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar src={user.image} sx={{ width: 56, height: 56, mr: 2 }} />
              <Box>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Progress</Typography>
            <LinearProgress variant="determinate" value={user.progress} sx={{ my: 1 }} />
            <Typography variant="body2">{user.progress}% completed</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
