import { AppState } from '../store';

export const selectError = (state: any) =>
  (state as AppState).courseAreaState.error;

export const selectCourses = (state: any) =>
  (state as AppState).courseState.courses;

export const selectCoursesAsOptions = (state: any) => {
  return (state as AppState).courseState.courses.map((course) => {
    return {
      label: course.name,
      value: course.id,
    };
  });
};
