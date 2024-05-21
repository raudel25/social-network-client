import React, { FC } from "react";
import { uploadPhoto } from "../api/fetch";
import { styled } from "@mui/material/styles";

interface UploadPhotoProps {
  onChange: (state: UploadPhotoState) => void;
  setLoading: (load: boolean) => void;
}

export interface UploadPhotoState {
  ok: boolean;
  id?: number;
  error?: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadPhoto: FC<UploadPhotoProps> = ({ onChange, setLoading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadPhotoFunc(event.target.files[0]);
    }
  };

  const uploadPhotoFunc = async (file: File) => {
    setLoading(true);
    const response = await uploadPhoto(file);
    setLoading(false);

    if (response.ok) onChange({ ok: true, id: response.value });
    else onChange({ ok: false, error: response.message });
  };

  return <VisuallyHiddenInput type="file" onChange={handleFileChange} />;
};

export default UploadPhoto;
