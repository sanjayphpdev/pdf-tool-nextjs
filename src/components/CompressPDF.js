"use client";
import React, { useState, useEffect } from "react";
import DropUpload from "./DropUpload";
import ProgressBar from "./ProgressBar";

export default function CompressPDF() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    warmUpServer("https://pdf-tool-backend-1.onrender.com/");
  }, []);

  const warmUpServer = async (BASE_URL) => {
    try {
      await fetch(BASE_URL, { method: "GET" });
    } catch (e) {
      console.warn("Warm-up failed (ignored):", e.message);
    }
  };

  const compress = async () => {
    setLoading(true);

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 3000;
    const BASE_URL = "https://pdf-tool-backend-1.onrender.com/";

    try {
      if (files.length === 0) {
        alert("Please upload PDF");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", files[0]);

      setProgress(10);

      await warmUpServer(BASE_URL);

      setProgress(20);

      let response;

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);

          response = await fetch(`${BASE_URL}compress`, {
            method: "POST",
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeout);

          // ✅ SUCCESS
          if (response.ok) break;

          // ❌ CLIENT ERROR (DO NOT RETRY)
          if (response.status >= 400 && response.status < 500) {
            const errorText = await response.text();
            throw new Error(errorText || "Invalid request");
          }

          // 🔁 SERVER ERROR → RETRY
          throw new Error("Server error, retrying...");
        } catch (err) {
          console.warn(`Attempt ${attempt} failed:`, err.message);

          // ❌ Do NOT retry validation errors
          if (err.message !== "Server error, retrying...") {
            throw err;
          }

          if (attempt === MAX_RETRIES) {
            throw new Error("Server is waking up. Please try again.");
          }

          await new Promise((res) => setTimeout(res, RETRY_DELAY));
        }
      }

      setProgress(70);

      const blob = await response.blob();

      const disposition = response.headers.get("Content-Disposition");
      const match = disposition && disposition.match(/filename="(.+)"/);
      const filename = match ? match[1] : "compress.pdf";

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);

      alert(error.message || "Something went wrong");

      setProgress(0);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Compress PDF</h3>

      <DropUpload setFiles={setFiles} />

      {files.length > 0 && (
        <div className="preview">
          <p>{files[0].name}</p>

          <button className="action-btn" onClick={compress} disabled={loading}>
            {loading ? "Processing..." : "Compress PDF"}
          </button>

          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
}
