import { ISubmission } from './ISubmission';

export interface IExerciseSheet {
  id: string;
  number: number;
  submissions: ISubmission[];
  user_id: string;
  subject_id: string;
  topic: string;
  public: boolean;
}
