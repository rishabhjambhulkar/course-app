import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseList: [],
    enrolledCourses: [], // Add this if you want to track enrollments
  },
  reducers: {
    addCourse: (state, action) => {
      state.courseList.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.courseList = state.courseList.filter(course => course.id !== action.payload);
    },
    enrollInCourse: (state, action) => {
      state.enrolledCourses.push(action.payload); // Add course to enrolledCourses
    },
  },
});

export const { addCourse, removeCourse, enrollInCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
