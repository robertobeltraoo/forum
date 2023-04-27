import { ITimestamps } from '../general';

export interface ICodePost extends ITimestamps {
  id?: number;
  title: string;
  describle: string;
  code: string;
  color: string;
  technology: string;
  like: number;
}
