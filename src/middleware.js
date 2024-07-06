import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get('token');
    const admin = req.cookies.get('admin');
    const user = req.cookies.get('user');

    if (req.nextUrl.pathname.startsWith("/login_register") && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    if (req.nextUrl.pathname.startsWith("/dashboard") && token && user) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    if (req.nextUrl.pathname.startsWith("/dashboard") && token && admin) {
        return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
}