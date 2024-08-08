import { RichText } from "./api";

export interface PostForm {
  photoId?: number;
  rePostId?: number;
  richText: RichText;
}
