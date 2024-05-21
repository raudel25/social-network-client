import { RichText } from "./api";

export interface Profile {
  id: number;
  name: string;
  profilePhotoId?: number;
  bannerPhotoId?: number;
  richText?: RichText;
  follow: boolean;
  username: string;
}

export interface ProfileForm {
  name: string;
  profilePhotoId?: number;
  bannerPhotoId?: number;
  richText?: RichText;
}
