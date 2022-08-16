import { ISubmussion } from './ISubmission';

export interface IExerciseSheet {
  id: string;
  number: number;
  submissions: ISubmussion[];
  user_id: string;
  subject_id: string;
}
