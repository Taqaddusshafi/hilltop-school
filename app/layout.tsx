import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Hilltop Educational Institute - Darend, Ganderbal",
    template: "%s | Hilltop Educational Institute"
  },
  description: "Premier educational institute in Darend, Ganderbal offering quality education with modern facilities and experienced faculty.",
  keywords: ["school in Ganderbal", "Hilltop Educational Institute", "Darend school", "Kashmir education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
