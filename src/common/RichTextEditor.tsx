import { FC, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import { RichText } from "../types/api";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface RichTextEditorProps {
  placeholder?: string;
  onChange: (value: RichText) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ placeholder, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (content: string) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const plainText = editor.getText();
      onChange({ html: content, text: plainText });
    }
  };
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        minHeight: "300px",
        mb: 2,
        "& .ql-toolbar": {
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        },
        "& .ql-container": {
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          minHeight: "250px",
        },
      }}
    >
      <ReactQuill
        ref={quillRef}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default RichTextEditor;
