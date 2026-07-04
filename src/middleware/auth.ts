import { auth } from '#/lib/auth';
import { isLoginPath, isPublicPath } from '#/lib/auth-paths';
import { createMiddleware } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router';
import { getRequestHeaders } from '@tanstack/react-start/server'

export const authMiddleware = createMiddleware({type: "request"}).server(
    async({request, next}) => {

        const headers = getRequestHeaders();
        const {pathname} = new URL(request.url);
        const session = await auth.api.getSession({headers})
        
        if(isLoginPath(pathname) && session) throw redirect({to: "/"})
        if(isPublicPath(pathname)) return next();
        if(!session) throw redirect({to: "/login"})
        return next({context: {session}});
    }
)
