import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyApQXqP1q52kCrCNWsuqXl__RWLuRMHDx8",
  authDomain: "todo-app-9c08d.firebaseapp.com",
  projectId: "todo-app-9c08d",
  storageBucket: "todo-app-9c08d.appspot.com",
  messagingSenderId: "915932933202",
  appId: "1:915932933202:web:d0bdeec4f9dee9dd69438b",
  measurementId: "G-G7ZXWWYMCE",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const messaging = getMessaging(app);

export { messaging };
