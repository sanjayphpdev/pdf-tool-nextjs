"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function DropUpload({ setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className="drop-zone">
      <input {...getInputProps()} />

      <p>Drag & Drop files here</p>
      <p>or click to upload</p>
    </div>
  );
}
