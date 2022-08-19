export type SubmissionType = 'Abgabe' | 'Korrektur' | 'Lösung';

export interface ISubmission {
  id: string;
  type: SubmissionType;
  fileType: string;
  user_id: string;
  exercise_sheet_id: string;
}
