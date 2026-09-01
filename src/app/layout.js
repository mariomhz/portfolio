import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = "https://mariohdez.vercel.app";
const TITLE = "José Mario Hernández / Fullstack Developer";
const DESCRIPTION =
  "Fullstack developer based in Tenerife, Canary Islands. Tecnico Superior en Desarrollo de Aplicaciones Web (DAW). Java, C#, JavaScript, TypeScript, Spring Boot, .NET, MySQL and Linux. Open to junior developer and technical support roles.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "José Mario Hernández Portfolio",
  authors: [{ name: "José Mario Hernández", url: SITE_URL }],
  creator: "José Mario Hernández",
  keywords: [
    "fullstack developer",
    "junior developer",
    "Next.js",
    "React",
    "Spring Boot",
    "Gemini API",
    "LLM integration",
    "Java",
    "C#",
    ".NET",
    "MySQL",
    "Linux",
    "DAW",
    "Tecnico Superior en Desarrollo de Aplicaciones Web",
    "PostgreSQL",
    "Tenerife",
    "Canary Islands",
    "desarrollador web",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "José Mario Hernández",
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "José Mario Hernández, Fullstack Developer, Tenerife",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "José Mario Hernández",
  url: SITE_URL,
  jobTitle: "Fullstack Developer",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Tecnico Superior en Desarrollo de Aplicaciones Web (DAW)",
    credentialCategory: "degree",
    educationalLevel: "Formacion Profesional de Grado Superior",
  },
  email: "mailto:mariohrdezdeveloper@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Canary Islands",
    addressCountry: "ES",
  },
  knowsLanguage: [
    "Portuguese",
    "Spanish",
    "English",
    "Italian",
    "Catalan",
    "French",
    "Norwegian",
    "American Sign Language",
  ],
  sameAs: [
    "https://github.com/mariomhz",
    "https://www.linkedin.com/in/mariohrdezc/",
    "https://instagram.com/mariocoding",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${robotoMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
