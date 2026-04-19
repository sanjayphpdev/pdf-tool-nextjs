"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import DropUpload from "./DropUpload";
import ProgressBar from "./ProgressBar";

export default function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const convert = async () => {
    if (files.length === 0) return;

    setProgress(20);

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      await new Promise((resolve) => {
        reader.onload = function () {
          if (i !== 0) pdf.addPage();

          pdf.addImage(reader.result, "JPEG", 0, 0, 210, 297);

          resolve();
        };

        reader.readAsDataURL(files[i]);
      });
    }

    setProgress(80);

    pdf.save("images.pdf");

    setProgress(100);
  };

  return (
    <div>
      <h3>JPG → PDF</h3>

      <DropUpload setFiles={setFiles} />

      {files.length > 0 && (
        <div className="preview">
          <p>{files.length} images selected</p>

          <button className="action-btn" onClick={convert}>
            Convert to PDF
          </button>

          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
}
