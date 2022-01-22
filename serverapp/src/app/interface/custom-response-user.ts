import { User } from './user';

export interface CustomResponseUser {
  timeStamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { users?: User[], user?: User };
}
