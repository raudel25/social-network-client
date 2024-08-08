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
  cantReactions: number;
  cantMessages: number;
}
// Profile       ProfileResponse `json:"profile"`
// 	PhotoID       uint          `json:"photoId"`
// 	RichText      *RichText        `json:"richText"`
// 	RePost        *PostResponse   `json:"rePost"`
// 	Reaction      bool            `json:"reaction"`
// 	CantReactions int             `json:"cantReactions"`
// 	CantMessages  int             `json:"cantMessages"`
// 	Date          time.Time       `json:"date"`
