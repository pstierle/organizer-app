import { ISelectOption } from './../_models/ISelectOption';
export const nullableOptions = (
  nullableLabel: string,
  options: ISelectOption[]
) => [{ label: nullableLabel, value: '' }, ...options];
