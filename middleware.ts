import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ['/dashboard','/meals','/profile','/settings','/workouts','/onboarding','/alleries','/ingredients'];

export async function middleware(request:NextRequest) {
    
    const token = request.cookies.get('access_token')?.value;

    const email = request.cookies.get("email")?.value;
    const pathname = request.nextUrl.pathname;
    if(!token) {

        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if(isProtectedRoute) {
            return NextResponse.redirect(new URL("/",request.url))
        }
        if(pathname==='/auth/otp' && !email) {
            return NextResponse.redirect(new URL("/",request.url))
            
        }

    } else {
        const checkPathToLoginOrRegister = pathname.startsWith('/auth') 
        || pathname === '/' ;
        
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
        '/auth/:path*', 
        '/dashboard/:path*',
        '/meals/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/workouts/:path*',
        '/alleries/:path*',
        '/ingredients/:path*'
    ],
}