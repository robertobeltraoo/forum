import { ITimestamps } from '../general';

export interface IUser extends ITimestamps {
  id?: number;
  name: string;
  email: string;
  password: string;
}
