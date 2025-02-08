// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import QueryingClass from "../firebase/queryingClass";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkK_2zD3N_FjdoTR88hgG8sKXURElsV4I",
  authDomain: "eriz-94e4e.firebaseapp.com",
  projectId: "eriz-94e4e",
  storageBucket: "eriz-94e4e.firebasestorage.app",
  messagingSenderId: "415052391040",
  appId: "1:415052391040:web:0547d28b2039cfe1c0bc65",
  measurementId: "G-81TFGSF26N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// login con otras plataformas
export const LoginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export const LoginWithGithub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider);
}

// email y password

// Clase para gestionar autenticación y registro de usuarios
class Auth {
  // Método para registrar un nuevo usuario
  async register(form) {
    try {
      // Verifica si el nombre de usuario ya existe en la base de datos
      const nameExists = await QueryingClass.checkIfNameExists(form.name);
      // Si el nombre ya está en uso, lanza un error personalizado
      if (nameExists) {
        throw new Error('El nombre de usuario ya está en uso');
      }

      // Crea un nuevo usuario con el correo electrónico y la contraseña proporcionados en el formulario
      const user = await createUserWithEmailAndPassword(
        auth,           // Instancia de autenticación de Firebase
        form.email,     // Correo electrónico proporcionado
        form.password   // Contraseña proporcionada
      );

      // Agrega los datos del nuevo usuario en la colección "client" de Firestore
      await QueryingClass.addData("client", {
        id: user.user.uid,  // Se utiliza el UID del usuario creado
        email: form.email,   // Correo electrónico del usuario
        name: form.name,     // Nombre del usuario
      });

      // Inicia sesión automáticamente después de registrar al usuario
      await this.login({ email: form.email, password: form.password });

      // Retorna un objeto con éxito si todo el proceso se completó sin errores
      return { success: true };
    } catch (e) {
      // En caso de error, muestra el error en la consola
      console.log(e);
      
      // Si el error es por un correo ya registrado, lanza un mensaje específico
      if (e.code === 'auth/email-already-in-use') {
        throw new Error('El correo electrónico ya está en uso');
      // Si el error es por el nombre de usuario ya existente, lanza un mensaje específico
      } else if (e.message === 'El nombre de usuario ya está en uso') {
        throw new Error('El nombre de usuario ya está en uso');
      // Si ocurre cualquier otro error, lanza un mensaje genérico
      } else {
        throw new Error('Su solicitud no puede ser realizada en este momento, intentelo más tarde');
      }
    }
  }
}







}

