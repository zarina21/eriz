"use client";
import React from "react";
import Image from "next/image";
import "../styles/login.scss";
import { Signika_Negative } from "next/font/google";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Importa los íconos

import { LoginWithGoogle, LoginWithGithub, Login} from "../components/firebase/client";



const SignikaNegative = Signika_Negative({
  variable: "--font-signika-negative",
  subsets: ["latin"],
});

export default function Home() {

  const GoogleClick = () => {
    LoginWithGoogle().then(user => {
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  }

  const GithubClick = () => {
    LoginWithGithub().then(user => {
      console.log(user)
    }).catch(err => { 
      console.log(err)
    })
  }

  const loginClick = (email, password) => {
    Login (email, password).then(user => {
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="login card ">
        <div>
          <Image href="#" alt="Eriz" width={200} height={200} />
          <h1 className={SignikaNegative.className} style={{ fontSize: "3rem" }}>
            Welcome to <span className="red">Eriz</span>
          </h1>
        </div>
        <div className="columna">
          <input className="cincopx" type="text" placeholder="Email" />
          <input className="cincopx" type="password" placeholder="Password" />
          <div className="row">
            <button className="cincopx botones" onClick={loginClick}> 
              Log in
            </button>
            <button className="cincopx botones">
              Sign up
            </button>
          </div>
        </div>
        <div>
          <button className="cincopx botones" onClick={GoogleClick}>
            <FaGoogle className="cincopx" style={{ color: '#fff' }} title="Google" />
            Sign in with Google
          </button>
          <button className="cincopx botones" onClick={GithubClick}>
            <FaGithub className="cincopx" style={{ color: '#fff' }} title="Github" />
            Sign in with Github
          </button>
        </div>  
      </div>
    </>
  );
}
