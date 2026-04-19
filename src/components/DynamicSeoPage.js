"use client";
import React, { useEffect } from "react";
import CompressPDF from "../components/CompressPDF";
import MergePDF from "../components/MergePDF";
import SplitPDF from "../components/SplitPDF";
import ProtectPDF from "../components/ProtectPDF";
import UnlockPDF from "../components/UnlockPDF";
import JpgToPdf from "../components/JpgToPdf";
import PdfToJpg from "../components/PdfToJpg";

const trackEvent = (name, data = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, data);
  }
};

export default function DynamicSeoPage({ slug }) {
  //console.log(`slug inside DynamicSeoPage = ${JSON.stringify(slug)}`);
  useEffect(() => {
    trackEvent(slug);
  }, []);
  const renderTool = () => {
    if (slug.includes("compress")) return <CompressPDF />;
    if (slug.includes("merge")) return <MergePDF />;
    if (slug.includes("split")) return <SplitPDF />;
    if (slug.includes("pdf-to-jpg")) return <PdfToJpg />;
    if (slug.includes("jpg")) return <JpgToPdf />;
    if (slug.includes("unlock") || slug.includes("unlock"))
      return <UnlockPDF />;
    if (slug.includes("protect") || slug.includes("lock"))
      return <ProtectPDF />;

    return null;
  };

  return renderTool();
}
