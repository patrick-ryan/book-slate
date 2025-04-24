import { gapiConfig } from "$lib/clients/firebase";
import { type SessionType } from "$lib/stores";

let tokenClient: google.accounts.oauth2.TokenClient;
let gapiInitialized = false;

async function initializeGapi() {
  // Load the GAPI client library
  console.log("Loading GAPI client");
  await new Promise((resolve, reject) => {
    gapi.load("client", {
      callback: resolve,
      onerror: reject,
    });
  });

  // Initialize the GAPI client
  console.log("Initializing GAPI client");
  await gapi.client.init({
    apiKey: gapiConfig.apiKey,
    discoveryDocs: gapiConfig.discoveryDocs,
  });

  gapiInitialized = true;
}

async function createSession(
  tokenResponse: google.accounts.oauth2.TokenResponse,
  session: SessionType
) {
  if (tokenResponse && tokenResponse.access_token) {
    console.log("Setting session");
    const profile = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }
    ).then((res) => res.json());

    session.set({
      user: {
        displayName: profile.name,
        email: profile.email,
      },
      loggedIn: true,
    });

    return true;
  } else {
    console.log("Token fetch failure");
    session.set(null);

    return false;
  }
}

async function initTokenClient(session: SessionType) {
  console.log("Initializing token client");
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: gapiConfig.clientId,
    scope: gapiConfig.scope,
    callback: async (tokenResponse) => createSession(tokenResponse, session),
  });
}

async function getAccessTokenAsync(session: SessionType) {
  console.log("Waiting for token");
  return new Promise((resolve, reject) => {
    let tempClient = google.accounts.oauth2.initTokenClient({
      client_id: gapiConfig.clientId,
      scope: gapiConfig.scope,
      callback: async (tokenResponse) => {
        let success = await createSession(tokenResponse, session);
        if (success) {
          resolve(null);
        } else {
          reject(new Error("Failed to get access token"));
        }
      },
    });

    tempClient.requestAccessToken();
  });
}

export async function authenticateAndLoadGapi(
  session: SessionType,
  wait: boolean
) {
  if (!gapiInitialized) {
    await initializeGapi();
  }

  if (!tokenClient) {
    await initTokenClient(session);
  }

  const tokenInfo = gapi.client.getToken();
  const isTokenValid =
    tokenInfo && Date.now() + Number(tokenInfo.expires_in) * 1000 > Date.now();

  if (isTokenValid) {
    console.log("Token still valid");
  } else {
    // Request an access token
    console.log("Requesting access token");
    if (wait) {
      await getAccessTokenAsync(session);
    } else {
      tokenClient.requestAccessToken();
    }
  }
}
