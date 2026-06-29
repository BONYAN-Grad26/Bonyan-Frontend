import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ['/dashboard','/meals','/profile','/settings','/workouts','/alleries','/ingredients','/cart'];

export async function middleware(request:NextRequest) {
    
    const tempToken = request.cookies.get('temp_token')?.value
    const token = request.cookies.get('access_token')?.value;
    const email = request.cookies.get("email")?.value;
    const pathname = request.nextUrl.pathname;

    if(!token) {
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if(isProtectedRoute) {
            if(tempToken) {
                return NextResponse.redirect(new URL("/onboarding",request.url))
            }
            if(email) {
                return NextResponse.redirect(new URL("/auth/otp",request.url))
            }
            return NextResponse.redirect(new URL("/",request.url))
        }
        if(pathname==='/auth/otp' && !email) {
            return NextResponse.redirect(new URL("/",request.url))
            
        }
        if(pathname.startsWith("/onboarding") && !tempToken) {
            if(email) {
                return NextResponse.redirect(new URL("/auth/otp",request.url))
            }
            return NextResponse.redirect(new URL("/",request.url))

        }


    } else {
        const checkPathToLoginOrRegister = pathname.startsWith('/auth') 
        || pathname === '/'  ;
        
        
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
        '/ingredients/:path*',
        '/cart/:path*'
    ],
}