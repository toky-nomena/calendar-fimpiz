import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Calendrier",
  description: "Calendrier FIMPIZ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background-color text-white">
      <body className={`font-sans ${inter.variable}`}>
        <header className="bg-background-color sticky top-0 z-30 w-full px-2 py-4 shadow-xl sm:px-4">
          <span className="text-xl font-black uppercase">
            Calendrier FIMPIZ {new Date().getFullYear()}
          </span>
        </header>
        <section>
          <div className="mx-auto font-sans">{children}</div>
        </section>
      </body>
    </html>
  );
}
