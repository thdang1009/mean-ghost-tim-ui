export class Post {
  category?: String[];
  id?: Number;
  title?: String;
  author?: String;
  user?: Number;
  permission?: String;
  description?: String;
  content?: String; // content
  postReference?: String;
  postImgUrls? : String[];
  postBackgroundImg?: String;
  isPinned?: Boolean;
  tags?: String[];
  order?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  clapCount?: Number;
}