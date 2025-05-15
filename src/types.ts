export enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genders;
  occupation: string;
}
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
