/* eslint-disable unicorn/prefer-string-raw */
import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "./config/i18n.config";
// Paths to exclude from redirect
const excludedPaths = ["/login", "/register", "/account", "/admin", "/api", "/static", "/_next", "/favicon.ico", "/robots.txt", "/sitemap.xml", "/dz", "/dz/"];

const INSCRIPTIONS_PERIOD = true;


// Middleware to handle i18n routing and redirect to /dz if not excluded
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply i18n routing first
  const i18nResponse = i18nRouter(request, i18nConfig);

  if (INSCRIPTIONS_PERIOD) {


    // Extract locale from pathname (based on i18nConfig.locales)
    console.log("MIDDLEWARE:Current pathname:", pathname);
    console.log("MIDDLEWARE:Excluded paths:", excludedPaths);
    const localeMatch = pathname.match(/^\/(ar|fr|en)(\/|$)/);
    const currentLocale = localeMatch ? localeMatch[1] : i18nConfig.defaultLocale;

    console.log("MIDDLEWARE:Current locale:", currentLocale);
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    console.log("MIDDLEWARE:Path without locale:", pathWithoutLocale);
    // Check if the path starts with any excluded paths
    const isExcluded = excludedPaths.some((path) => pathWithoutLocale.startsWith(path));
    console.log("MIDDLEWARE:Is excluded:", isExcluded);


    // If path is not excluded and doesn't start with /dz (after locale)
    if (!isExcluded) {
      const pathAfterLocale = currentLocale
        ? pathname.replace(`/${currentLocale}`, "")
        : pathname;

      if (pathAfterLocale !== "/dz" && !pathAfterLocale.startsWith("/dz/")) {
        // Redirect to /dz with locale
        const redirectPath = `/${currentLocale}/dz`;
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }

  }

  // Return the i18n response if no redirect is needed
  return i18nResponse;
}


// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};