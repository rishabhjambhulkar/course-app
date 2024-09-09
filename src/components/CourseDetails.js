import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { enrollInCourse } from '../redux/coursesSlice.js'; // Adjust the path as needed
import { Container, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box, Snackbar, Alert } from '@mui/material';

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courseList);
  const [course, setCourse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const courseId = parseInt(id, 10); // Convert the id to a number
      const filteredCourses = courses.filter((course) => course.id === courseId);
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
      setOpenSnackbar(true);
    } else {
      console.error('No course selected for enrollment.');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {course ? (
        <>
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', md: 300 }, height: { xs: 300, md: 'auto' } }}
              image={course.thumbnail}
              alt={course.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="h2" variant="h4" gutterBottom>
                  {course.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {course.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Box>
          </Card>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Course enrolled successfully!"
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              Course enrolled successfully!
            </Alert>
          </Snackbar>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default CourseDetail;
