
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZnRgXOFtpuq80GVI6juJgBqH2QPvJIm0",
  authDomain: "e-commerce-furniro.firebaseapp.com",
  projectId: "e-commerce-furniro",
  storageBucket: "e-commerce-furniro.appspot.com",
  messagingSenderId: "686313986444",
  appId: "1:686313986444:web:664df44aac6743f0671ea9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);