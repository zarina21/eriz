import { auth } from "./client";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import QueryingClass from "./queryingClass";
import Cookies from "js-cookie";


export const Login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    Cookies.set("token", token, { expires: 7 });
    window.location.href = "/";

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

class Auth {
  async register(form) {
    try {
      const nameExists = await QueryingClass.checkIfNameExists(form.name);
      if (nameExists) {
        throw new Error('El nombre de usuario ya está en uso');
      }

      const user = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await QueryingClass.addData("client", {
        id: user.user.uid,
        email: form.email,
        name: form.name,
      });

      await this.login({ email: form.email, password: form.password });
      return { success: true };
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/email-already-in-use') {
        throw new Error('El correo electrónico ya está en uso');
      } else if (e.message === 'El nombre de usuario ya está en uso') {
        throw new Error('El nombre de usuario ya está en uso');
      } else {
        throw new Error('Su solicitud no puede ser realizada en este momento, intentelo más tarde');
      }
    }
  }

  async login(credentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        resolve(userCredential.user);
      } catch (e) {
        reject(e.code);
      }
    });
  }
  LoginWithGoogle = async() => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      //const idToken = await user.getIdToken();
      //Cookies.set("token", idToken, { expires: 7 });
      console.log(result, user)
      window.location.href = "/";

    } catch (error) {
      console.log(error)
    }
  };
    
  LoginWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  }
  
  

  async logout() {
    return new Promise((resolve, reject) => {
      signOut(auth).then(() => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
}

const AuthClass = new Auth();

export default AuthClass;