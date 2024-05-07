import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Providers } from "~/providers";

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
    <html lang="en" className="bg-background-color text-white backdrop-blur">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 px-6 py-4 backdrop-blur">
            <span className="text-xl font-black uppercase">
              Calendrier FIMPIZ {new Date().getFullYear()}
            </span>
          </header>
          <section>
            <div className="mx-auto font-sans">{children}</div>
          </section>
        </Providers>
      </body>
    </html>
  );
}
