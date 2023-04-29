import { Close, Upload } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
type UploadState = "upload" | "uploading" | "uploaded";

type ImageUploadProps = {
  onFileChange: (argo: File) => void;
  onReset: () => void;
  uploadText?: string;
  disabled?: boolean;
  state: UploadState;
  fileDownloadName?: string;
};

const FileInput = styled.input`
  display: none;
`;

const DefaultFileUploadButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "roboto";
  color: var(--color-grey-dark);
  border: 0.5px solid var(--color-grey-dark);
  border-radius: var(--border-radius);
  padding: 18px 12px;
  width: 100%;
  cursor: pointer;
  background-color: "var(--color-grey)";

  span {
    margin-right: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    font-size: var(--font-size-p);
    text-align: left;
  }

  &:focus:not([disabled]) {
    outline: none;
    box-shadow: none;
  }

  &:active:not([disabled]),
  &:focus:not([disabled]) {
    filter: brightness(0.75);
  }

  &[disabled] {
    cursor: default;
    color: var(--color-grey-darker);
  }
`;

const ImageUpload = (props: ImageUploadProps) => {
  const { onFileChange, onReset, disabled, state, fileDownloadName } = props;
  const [fileName, setFileName] = useState(fileDownloadName);

  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (state === "upload") {
      setFileName("");
    }
  }, [state, setFileName]);

  const handleUploadClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!fileInput) {
      return;
    }

    if (state === "upload") {
      fileInput.current.click();
    } else if (state === "uploaded") {
      onReset();
    }
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e?.currentTarget?.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    onFileChange(file);
    fileInput.current.value = "";
  };

  const renderStateIcon = () => {
    if (state === "uploading") {
      return <CircularProgress />;
    } else if (state === "uploaded") {
      return <Close />;
    } else {
      return <Upload />;
    }
  };

  return (
    <>
      <DefaultFileUploadButton
        disabled={state === "uploading" || disabled}
        onClick={handleUploadClick}
        type="button"
      >
        <span>{fileName !== "" ? fileName : "Store Image or Logo"}</span>
        {!disabled && renderStateIcon()}
      </DefaultFileUploadButton>

      <FileInput
        type="file"
        accept={".png,.jpeg,.jpg,.jfif"}
        ref={fileInput}
        onChange={handleFileChange}
        disabled={disabled}
        placeholder="Store Image or Logo"
        name="image"
      />
    </>
  );
};

export default ImageUpload;
