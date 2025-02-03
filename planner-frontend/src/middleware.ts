import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth-token.service";

export function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request;

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
	const isAuthPage = nextUrl.pathname.startsWith("/auth");

	if (
		nextUrl.pathname.startsWith("/_next") ||
		nextUrl.pathname.startsWith("/api") ||
		nextUrl.pathname.startsWith("/static") ||
		nextUrl.pathname === "/favicon.ico"
	) {
		return NextResponse.next();
	}

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(
			new URL(DASHBOARD_PAGES.HOME, request.url)
		);
	}

	if (!refreshToken && !isAuthPage) {
		console.log("Redirecting to /auth:", request.url);
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"],
};
