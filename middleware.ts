// Vercel Edge Middleware — runs server-side, before the SPA is ever served.
// Gates direct/fresh navigations to /admin behind HTTP Basic Auth.
//
// This only protects the initial page load. Since "/admin" is no longer
// linked anywhere in the app's navigation, a full page load is the only way
// to reach it — there's no in-app link that could bypass this check via
// client-side routing.
//
// Requires two environment variables to be set in the Vercel project
// (Project Settings → Environment Variables): ADMIN_USER and ADMIN_PASSWORD.
// Until they're set, /admin is blocked unconditionally (fails closed).

export const config = {
  matcher: '/admin'
}

// Edge Middleware isn't Node.js, but Vercel statically replaces
// process.env.X references at build time — @types/node isn't available
// here, so this just tells TS enough about the shape we actually use.
declare const process: { env: Record<string, string | undefined> }

export default function middleware(request: Request) {
  const expectedUser = process.env.ADMIN_USER
  const expectedPassword = process.env.ADMIN_PASSWORD

  const unauthorized = () =>
    new Response('Accesso riservato.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"' }
    })

  if (!expectedUser || !expectedPassword) {
    return unauthorized()
  }

  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Basic ')) {
    return unauthorized()
  }

  const decoded = atob(auth.slice('Basic '.length))
  const separatorIndex = decoded.indexOf(':')
  const user = decoded.slice(0, separatorIndex)
  const password = decoded.slice(separatorIndex + 1)

  if (user !== expectedUser || password !== expectedPassword) {
    return unauthorized()
  }

  return undefined
}
