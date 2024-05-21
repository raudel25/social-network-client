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
  value?: RichText;
  onChange: (value: RichText) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  placeholder,
  onChange,
}) => {
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
        borderRadius: "20px",
        minHeight: "300px",
        mb: 2,
        "& .ql-toolbar": {
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        },
        "& .ql-container": {
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          minHeight: "250px",
        },
      }}
    >
      <ReactQuill
        value={value?.html}
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
