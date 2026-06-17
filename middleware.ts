import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ['/dashboard','/meals','/profile','/settings','/workouts','/onboarding','alleries'];

export async function middleware(request:NextRequest) {
    
    const token = request.cookies.get('access_token')?.value;
    const pathname = request.nextUrl.pathname;

    if(!token) {

        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if(isProtectedRoute) {
            return NextResponse.redirect(new URL("/",request.url))
        }
    } else {
        const checkPathToLoginOrRegister = pathname.startsWith('/auth/login') 
        ||  pathname.startsWith('/auth/register') || pathname === '/' ;
        
        if(checkPathToLoginOrRegister) {
            return NextResponse.redirect(new URL("/dashboard",request.url))
        }
        

    }
    return NextResponse.next();
    
    




}

export const config = {
    matcher: [
        "/",
        '/onboarding/:path*',
        '/auth/login', 
        '/auth/register',
        '/dashboard/:path*',
        '/meals/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/workouts/:path*',
        '/alleries/:path*'
    ],
}