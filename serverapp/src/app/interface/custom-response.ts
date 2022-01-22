import { Student } from './student';
import { User } from './user';

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { students?: Student[], student?: Student, users?: User[], user?: User };
}
