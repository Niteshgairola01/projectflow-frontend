export type EntityId = string;
export type ISODateString = string;

export interface SelectOption<TValue extends string = string> {
  label: string;
  value: TValue;
}
