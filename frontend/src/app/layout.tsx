import "@utilities/extend-prototypes";
//
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/config";
import NProgressProvider from "@/hooks/context/nprogress.provider";
import initTranslations from "@/i18n/index";
import TranslationsProvider from "@/i18n/provider";
import { i18nNamespaces } from "@config/i18n.config";
import AuthenticationLoader from "@features/auth/utils/authentication-loader";
import AppConfigLoader from "@lib/app-config-manager/utils/app-config-loader";
import initLogger, { LoggerContext } from "@lib/logging";
import { StoreProvider } from "@redux/providers/store-provider";
import colors from "colors";
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import "../styles/main.scss";

colors.enable();

const logger = initLogger(LoggerContext.APPLICATION, "layout");

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_Arabic({
  variable: "--font-noto",
  weight: ['400', '500', '600', '700', '100', '200', '300', '800', '900'],
  subsets: ["arabic"],
});
const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const hammah = localFont({
  src: "../styles/fonts/ArbFONTS-Ara_Hamah_Sahet_AlAssi.ttf",
  weight: "100 600 700",
  variable: "--font-hammah",
});

export const metadata: Metadata = {
  applicationName: appConfig.APP_NAME,
  title: {
    default: appConfig.APP_DEFAULT_TITLE,
    template: appConfig.APP_TITLE_TEMPLATE,
  },
  description: appConfig.APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appConfig.APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: appConfig.APP_NAME,
    title: {
      default: appConfig.APP_DEFAULT_TITLE,
      template: appConfig.APP_TITLE_TEMPLATE,
    },
    description: appConfig.APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: appConfig.APP_DEFAULT_TITLE,
      template: appConfig.APP_TITLE_TEMPLATE,
    },
    description: appConfig.APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

function showThemeClasses() {
  if (typeof window === "undefined") return "";
  const dark = localStorage.getItem("dark") === "1";
  const theme = localStorage.getItem("theme") === "default";
  return `${dark ? "dark" : ""} ${theme}`;
}

export default async function RootLayout({
  children,
  params: { locale, lang },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string; lang: string };
}>) {
  locale = locale ?? "ar";
  logger.value("LOCALE", { locale, lang });

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={locale !== "ar" ? "ltr" : "rtl"}>
      <head>
        <link rel="preload" href="/assets/miqat/images/mosque2.webp" as="image" />
        <link rel="preload" href="/assets/miqat/images/hajj-placeholder.webp" as="image" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.className} ${noto.variable} ${geistSans.variable} ${hammah.variable} ${geistMono.variable} antialiased ${showThemeClasses()}`}
      >
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <StoreProvider>
            {/* <ThemeLoader /> */}
            <AuthenticationLoader />
            <AppConfigLoader />
            <NProgressProvider>{children}</NProgressProvider>
          </StoreProvider>
        </TranslationsProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
