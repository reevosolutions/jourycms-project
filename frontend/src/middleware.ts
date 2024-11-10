/* eslint-disable unicorn/prefer-string-raw */
import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";

import i18nConfig from "./config/i18n.config";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
