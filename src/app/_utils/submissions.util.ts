import { ISubmission } from './../_models/ISubmission';
import { SubmissionType } from '../_models/ISubmission';

export const submissionTypesArr: SubmissionType[] = [
  'Abgabe',
  'Lösung',
  'Korrektur',
];

export const getCountByType = (submissions: ISubmission[]) => {
  let countByType: any = {};

  submissionTypesArr.forEach((type) => {
    countByType[type] = submissions.filter((s) => s.type === type).length ?? 0;
  });

  return countByType;
};
