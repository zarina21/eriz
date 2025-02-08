import { app } from "./firebase";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import QueryingClass from "./queryingclass";

const auth = getAuth(app);

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
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        resolve();
      } catch (e) {
        reject(e.code);
      }
    });
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