import { BookPermission } from '../_shares/enum';
export class Book {
    id?: Number;
    title?: String;
    user?: Number;
    content: String; // content
    score?: Number;
    isDone?: Boolean;
    slot: Number; // 1, 2, 3
    url?: String;
    permission?: BookPermission;
    createdAt?: Date;
    updatedAt?: Date;
  }


export class BookReadingInfo {
  user?: Number;
  info?: String;
  createdAt?: Date;
  updatedAt?: Date;
}