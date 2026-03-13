import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "MIND STUDIO — Secure Care & Case Coordination",
  description: "Document wellness, organize records, connect with providers, escalate to legal review — all secured.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><div className="grain" />{children}</body></html>);
}
