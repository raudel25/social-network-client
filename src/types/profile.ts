import { Photo, RichText } from "./api";

export interface Profile {
  id: number;
  name: string;
  profile_photo?: number;
  bannerPhoto?: Photo;
  richText: RichText;
  follow: boolean;
  username: string;
}
