import { ICourse } from './ICourse';
export interface IUser {
  id: string;
  name: string;
  university_id: number | null;
  course?: ICourse;
  course_id: number | null;
}
