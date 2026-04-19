"use client";
import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
