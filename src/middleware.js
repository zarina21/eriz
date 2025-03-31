
const { NextResponse } = require("next/server");
const { auth } = require("./components/firebase/client");

async function middleware(req) {
  const token = req.cookies.get("token");  // Verifica si el acceso a la cookie es correcto
  const url = req.nextUrl;
  console.log(token, "hola mundo");

  if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  try {
    if (token) {
      await auth.verifyIdToken(token);  // Verifica el token
      if (req.nextUrl.pathname === "/login") {
        // Si ya está autenticado y está intentando acceder a la página de login, redirigir a la página principal
        return NextResponse.redirect(new URL("/", req.url)); 
      }
      return NextResponse.next();  // Continuar si el token es válido
    }

    // Redirigir solo si no estamos ya en la página de login
    if (req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url)); 
    }

  } catch (error) {
    console.error("Error verificando token:", error);
    // Redirigir al login en caso de error
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si nada más ocurre, permitir la petición
  return NextResponse.next();
}

export default middleware