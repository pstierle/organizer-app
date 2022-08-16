export type SubmisstionType = 'Abgabe' | 'Korrektur' | 'Lösung';

export interface ISubmussion {
  id: string;
  type: SubmisstionType;
  fileType: string;
  user_id: string;
  exerciseSheet_id: string;
}
