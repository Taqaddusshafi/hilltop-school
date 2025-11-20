import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
