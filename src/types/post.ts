import { RichText } from "./api";
import { Profile } from "./profile";

export interface PostForm {
  photoId?: number;
  rePostId?: number;
  richText: RichText;
}

export interface Post {
  id: number;
  richText: RichText;
  profile: Profile;
  photoId?: number;
  rePost: Post;
  reaction: boolean;
  cantRePosts: number;
  cantReactions: number;
  cantMessages: number;
  messages: Message[];
  date: string;
}

export interface MessageForm {
  richText: RichText;
}

export interface Message {
  richText: RichText;
  profile: Profile;
}
