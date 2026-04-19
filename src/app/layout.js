import "./globals.css";

import Script from "next/script";

export const metadata = {
  title: {
    default: "PDFMints - Free PDF Tools Online",
    template: "%s | PDFMints",
  },
  description:
    "Compress, merge, split, convert and protect PDF files online for free. Fast, secure and easy-to-use PDF tools at PDFMints.",
  keywords: [
    "pdf tools",
    "compress pdf",
    "merge pdf",
    "split pdf",
    "protect pdf",
    "pdf to jpg",
    "jpg to pdf",
  ],
  metadataBase: new URL("https://pdfmints.com"),

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "PDFMints - Free PDF Tools",
    description:
      "All-in-one free PDF tools. Compress, merge, split and protect PDFs instantly.",
    url: "https://pdfmints.com",
    siteName: "PDFMints",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PDFMints - Free PDF Tools",
    description: "Fast & secure PDF tools online.",
    images: ["/og-image.png"],
  },

  themeColor: "#6366f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SGKL4YT014"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SGKL4YT014');
  `}
        </Script>
        {children}

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </body>
    </html>
  );
}
