"use client";
import Link from "next/link";
import {
  FileText,
  Merge,
  Scissors,
  Lock,
  Unlock,
  Image,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    title: "Compress PDF",
    link: "/compress-pdf-to-100kb",
    icon: <FileText size={28} />,
  },
  { title: "Merge PDF", link: "/merge-pdf-files", icon: <Merge size={28} /> },
  {
    title: "Split PDF",
    link: "/split-pdf-pages",
    icon: <Scissors size={28} />,
  },
  {
    title: "Protect PDF",
    link: "/password-protect-pdf",
    icon: <Lock size={28} />,
  },
  {
    title: "Unlock PDF",
    link: "/unlock-protect-pdf",
    icon: <Unlock size={28} />,
  },
  {
    title: "PDF to JPG",
    link: "/pdf-to-jpg",
    icon: (
      <>
        <FileText size={28} />
        <ArrowRight size={16} />
        <Image size={28} />
      </>
    ),
  },
  {
    title: "JPG to PDF",
    link: "/jpg-to-pdf",
    icon: (
      <>
        <Image size={28} />
        <ArrowRight size={16} />
        <FileText size={28} />
      </>
    ),
  },
];
export default function Cards() {
  return (
    <div className="tools-container">
      {tools.map((tool, i) => (
        <Link key={i} href={tool.link} className="tool-card">
          <div className="tool-icon">{tool.icon}</div>
          <h3>{tool.title}</h3>
          <p>Quick & easy tool</p>
        </Link>
      ))}
    </div>
  );
}
