import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Mind Studio | Talent & Legal Management",
  description: "Talent management, contract tracking, and deal pipeline by Myia B.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><div className="grain" />{children}</body></html>);
}
