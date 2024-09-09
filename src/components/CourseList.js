import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from '../redux/coursesSlice.js';
import db from '../db.json'; // Adjust the path accordingly
import { Container, Grid, Card, CardMedia, CardContent, Typography, TextField, Button } from '@mui/material';

const CourseList = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  // Use local db.json for fetching courses
  useEffect(() => {
    setCourses(db.courses); // Assuming `db.json` contains a `courses` key
    db.courses.forEach(course => dispatch(addCourse(course)));
  }, [dispatch]);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase()) || 
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search by name or instructor"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Course List */}
      <Grid container spacing={4}>
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 180 }}
                image={course.thumbnail}
                alt={course.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor}
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/course/${course.id}`}
                variant="contained"
                color="primary"
                sx={{ mt: 'auto', mx: 2, mb: 2 }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
