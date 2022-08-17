import { IExerciseSheet } from './IExerciseSheet';
export interface ISubject {
  id: string;
  name: string;
  semester: number;
  user_id: string;
  excercise_sheets: IExerciseSheet[];
}
