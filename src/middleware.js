import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get('token');
    const admin = req.cookies.get('admin');
    if (token && admin) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
}