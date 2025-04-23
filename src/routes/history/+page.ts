import { initializeFirebase, auth } from "$lib/clients/firebase/";
import { browser } from "$app/environment";
import { onAuthStateChanged } from "firebase/auth";
// import { PageLoad } from "./$types";

export const load = async ({ url }) => {
  if (browser) {
    try {
      initializeFirebase();
    } catch (ex) {
      console.error(ex);
    }
  }

  function getAuthUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => resolve(user ? user : false));
    });
  }

  return {
    getAuthUser: getAuthUser,
    url: url.pathname,
    session: null,
  };
};
