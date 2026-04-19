"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import DropUpload from "./DropUpload";
import ProgressBar from "./ProgressBar";

export default function SplitPDF() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const split = async () => {
    if (files.length === 0) return;

    const file = files[0];

    setProgress(20);

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    for (let i = 0; i < pdf.getPageCount(); i++) {
      const newPdf = await PDFDocument.create();

      const [page] = await newPdf.copyPages(pdf, [i]);

      newPdf.addPage(page);

      const data = await newPdf.save();

      const blob = new Blob([data], { type: "application/pdf" });

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = `page-${i + 1}.pdf`;
      link.click();
    }

    setProgress(100);
  };

  return (
    <div>
      <h3>Split PDF</h3>

      <DropUpload setFiles={setFiles} />

      {files.length > 0 && (
        <div className="preview">
          <p>{files[0].name}</p>

          <button className="action-btn" onClick={split}>
            Split PDF
          </button>

          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
}
