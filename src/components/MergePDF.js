"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import DropUpload from "./DropUpload";
import ProgressBar from "./ProgressBar";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const merge = async () => {
    if (files.length === 0) return;

    setProgress(20);

    const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      pages.forEach((p) => mergedPdf.addPage(p));
    }

    setProgress(70);

    const mergedBytes = await mergedPdf.save();

    const blob = new Blob([mergedBytes], { type: "application/pdf" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();

    setProgress(100);
  };

  return (
    <div>
      <h3>Merge PDF</h3>

      <DropUpload setFiles={setFiles} />

      {files.length > 0 && (
        <div className="preview">
          <p>{files.length} files selected</p>

          <button className="action-btn" onClick={merge}>
            Merge PDFs
          </button>

          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
}
