<script lang="ts">
  import { gapiConfig } from "$lib/clients/firebase";
  import { useSession } from "$lib/stores";
  import { onMount } from "svelte";

  let tokenClient: google.accounts.oauth2.TokenClient;
  let gapiInitialized = false;

  let session = useSession();

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

  async function initTokenClient() {
    console.log("Initializing token client");
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: gapiConfig.clientId,
      scope: gapiConfig.scope,
      callback: async (tokenResponse) => {
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
      },
    });
  }

  export async function authenticateAndLoadGapi() {
    if (!gapiInitialized) {
      await initializeGapi();
    }

    if (!tokenClient) {
      await initTokenClient();
    }

    // Request an access token
    console.log("Requesting access token");
    tokenClient.requestAccessToken();
  }

  function decodeJwtResponse(token: string) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  async function handleCredentialResponse(response: { credential: string }) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    let responsePayload = decodeJwtResponse(response.credential);

    session.set({
      user: {
        displayName: responsePayload.name,
        email: responsePayload.email,
      },
      loggedIn: true,
    });

    // Initialize gapi after login
    await authenticateAndLoadGapi();
  }

  async function signin() {
    // google.accounts.id.prompt();

    await authenticateAndLoadGapi();
  }

  onMount(() => {
    // google.accounts.id.initialize({
    //   client_id:
    //     "501277735828-ltusfks6sb8oaboqk050j3qte5ogmi2h.apps.googleusercontent.com",
    //   callback: handleCredentialResponse,
    //   context: "signin",
    //   ux_mode: "popup",
    //   auto_select: false,
    // });
  });
</script>

<div id="main">
  {#if $session && $session.user && $session.loggedIn == true}
    <article>
      <header>
        Signed in as {$session.user.displayName}
      </header>
      <main><small>{$session.user.email}</small></main>
    </article>
  {:else}
    <button on:click={signin}>Sign in</button>
  {/if}
</div>

<style lang="scss">
  #main {
    display: flex;
    align-items: center;

    --pico-block-spacing-vertical: 0;
  }
</style>
