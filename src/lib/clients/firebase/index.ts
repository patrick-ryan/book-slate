import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import { browser } from "$app/environment";

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === "true",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

export const initializeFirebase = () => {
  if (!browser) {
    throw new Error("Can't use the Firebase client on the server.");
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    // if (firebaseConfig.useEmulator) {
    //   connectAuthEmulator(auth, "http://127.0.0.1:9099");
    // }
  }
};

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.file",
];
export const gapiConfig = {
  apiKey: firebaseConfig.apiKey,
  clientId:
    "713710269016-ola80cev9prrbgq6e2m6d7gs59e0f7r7.apps.googleusercontent.com", // OAuth Client ID
  discoveryDocs: [
    DISCOVERY_DOC,
    "https://www.googleapis.com/discovery/v1/apis/oauth2/v1/rest",
  ],
  scope: SCOPES,
};
