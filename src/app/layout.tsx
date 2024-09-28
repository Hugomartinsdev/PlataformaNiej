import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins-sans",
});

export const metadata: Metadata = {
  applicationName: "Plataforma Niej",
  generator: "Plataforma Niej",
  title: {
    absolute: "Plataforma Niej",
    default: "Plataforma Niej",
    template: "%s | Plataforma Niej",
  },
  description: "Plataforma Niej.",
  // manifest: "/manifest.json",
  // alternates: {
  //   canonical: "/",
  // },
  // openGraph: {
  //   title: "Ecosphere",
  //   description:
  //     "Bem vindo ao Ecosphere, a plataforma que conecta empresas comprometidas com a sustentabilidade amazônica; a comunidade local e todo o seu conhecimento tradicional; e o conhecimento científico e tecnológico para o desenvolvimento bioeconômico da região.",
  //   url: "https://ecosphere.mawatech.com.br",
  //   siteName: "Ecosphere",
  //   images: [
  //     {
  //       url: "/banner.png",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: "pt_BR",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Ecosphere",
  //   description:
  //     "Bem vindo ao Ecosphere, a plataforma que conecta empresas comprometidas com a sustentabilidade amazônica; a comunidade local e todo o seu conhecimento tradicional; e o conhecimento científico e tecnológico para o desenvolvimento bioeconômico da região.",
  //   images: ["/banner.png"],
  // },
  // appleWebApp: {
  //   title: "Ecosphere",
  //   statusBarStyle: "default",
  // },
  // icons: {
  //   icon: "/favicon.ico",

  //   other: [
  //     {
  //       rel: "apple-touch-icon-precomposed",
  //       url: "/apple-touch-icon-precomposed.png",
  //     },
  //     {
  //       rel: "mask-icon",
  //       type: "image/png",
  //       url: "/safari-pinned-tab.svg",
  //       color: "#3E0742",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "16x16",
  //       url: "/favicon-16x16.png",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "32x32",
  //       url: "/favicon-32x32.png",
  //     },

  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "180x180",
  //       url: "/apple-touch-icon.png",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "192x192",
  //       url: "/icon-192.png",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "512x512",
  //       url: "/icon-512.png",
  //     },
  //   ],
  //   apple: {
  //     url: "/apple-touch-icon.png",
  //     color: "#3E0742",
  //   },
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="h-full bg-gray-50">
      <body
        className={`h-full font-sans ${poppins.variable} scroll-smooth antialiased`}
      >
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
