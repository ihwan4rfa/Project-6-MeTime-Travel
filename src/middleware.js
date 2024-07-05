import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get('token');
    const admin = req.cookies.get('admin');
    const user = req.cookies.get('user');

    if (token) {
        if (admin) {
            return NextResponse.next();
        } else if (user) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
    } else {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
}