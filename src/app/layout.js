import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "MÁRIO HERNÁNDEZ / FULLSTACK & CREATIVE DEVELOPER",
  description: "Fullstack & creative developer based in Europe. Fluent in eight spoken languages and a handful of programming ones.",
  openGraph: {
    title: "MÁRIO HERNÁNDEZ / FULLSTACK & CREATIVE DEVELOPER",
    description: "Fullstack & creative developer based in Europe. Fluent in eight spoken languages and a handful of programming ones.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
