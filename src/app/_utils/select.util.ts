import { ISelectOption } from './../_models/ISelectOption';
export const nullableOptions = (options: ISelectOption[]) => [
  { label: 'Keine Angabe', value: '' },
  ...options,
];
