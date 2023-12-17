import { initializeFirestore } from "firebase/firestore";
import { firebaseConfig } from "./FirebaseConfig";
import { getApp, initializeApp } from "firebase/app";
let app: any = null;
const firebase = firebaseConfig;
export function initFirebase() {
  if (!app) return (app = initializeApp(firebase));
}

export function getStore() {
  initFirebase();
  const app = getApp();
  return initializeFirestore(app, { ignoreUndefinedProperties: true });
}
