import { Nunito } from "next/font/google";
import "./globals.css";

// display:swap prevents invisible text during font load
const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Abhijeet Singh — Fullstack Developer",
  description:
    "Personal portfolio of Abhijeet Singh Parihar — Fullstack developer with a frontend focus. Built with Next.js, React, MongoDB and more.",
  openGraph: {
    title: "Abhijeet Singh — Fullstack Developer",
    description: "Personal portfolio of Abhijeet Singh Parihar.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
