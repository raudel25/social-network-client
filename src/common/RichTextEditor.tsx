import React, { FC, useState, useEffect } from "react";
import { RichText } from "../types/api";
import MUIRichTextEditor, { TMUIRichTextEditorProps } from "mui-rte";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

interface RichTextEditorProps {
  placeholder?: string;
  defaultValue?: RichText;
  onChange: (value: RichText) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  defaultValue,
  placeholder,
  onChange,
}) => {
  const [defaultContent, setDefaultContent] = useState<string>(() => {
    if (defaultValue?.html) {
      const contentState = stateFromHTML(defaultValue.html);
      return JSON.stringify(convertToRaw(contentState));
    }
    return "";
  });

  useEffect(() => {
    if (defaultValue?.html) {
      const contentState = stateFromHTML(defaultValue.html);
      setDefaultContent(JSON.stringify(convertToRaw(contentState)));
    }
  }, [defaultValue]);

  const handleEditorChange = (state: EditorState) => {
    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const html = stateToHTML(contentState);
    const plainText = rawContent.blocks.map((block) => block.text).join("\n");

    onChange({ html, text: plainText });
  };

  const editorProps: TMUIRichTextEditorProps = {
    label: placeholder,
    defaultValue: defaultContent,
    onChange: handleEditorChange,
  };

  return <MUIRichTextEditor {...editorProps} />;
};

export default RichTextEditor;
