"use client";
import React, { useState, useEffect } from "react";

import DropUpload from "./DropUpload";
import ProgressBar from "./ProgressBar";

export default function PdfToJpg() {
  const [pdfjs, setPdfjs] = useState(null);
  useEffect(() => {
    import("pdfjs-dist").then((mod) => {
      mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
      setPdfjs(mod);
    });
  }, []);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const convert = async () => {
    if (files.length === 0) return;

    const file = files[0];

    setProgress(20);

    const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      canvas.toBlob((blob) => {
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = `page-${i}.jpg`;
        link.click();
      });
    }

    setProgress(100);
  };

  return (
    <div>
      <h3>PDF → JPG</h3>

      <DropUpload setFiles={setFiles} />

      {files.length > 0 && (
        <div className="preview">
          <p>{files[0].name}</p>

          <button className="action-btn" onClick={convert}>
            Convert to JPG
          </button>

          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
}
