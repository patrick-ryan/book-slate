<script lang="ts">
  import { BROWSER } from "esm-env";

  import "../app.scss";
  import "@picocss/pico";
  import _ from "lodash";

  import { goto } from "$app/navigation";
  import { navigating, page } from "$app/stores";

  import { useLoading } from "$lib/stores";

  // import {
  //   supabase,
  // } from "$lib/clients/supabase";
  import { RingLoader } from "svelte-loading-spinners";
  import Toast from "$lib/components/toast.svelte";
  import { onMount } from "svelte";

  // initialize stores
  let pageLoading = useLoading();

  // TODO: this should use a store, if any of the page load functions
  // runs and does not have a session, it should set the store value to
  // false before redirecting to /login (supports session expiration
  // while being offline, or where no refresh token exists)
  let loggedIn = false;

  // supabase.auth.onAuthStateChange((event, session) => {
  //   // listen to events like sign-in or sign-out, if a
  //   // session exists then the user is logged in
  //   loggedIn = Boolean(session);
  //   if (!loggedIn && $page.url.pathname != "/login") {
  //     goto("/login", { invalidateAll: true });
  //   } else if (loggedIn && $page.url.pathname == "/login") {
  //     goto("/");
  //   }
  // });

  let loading = false;

  // async function handleSignout() {
  //   loading = true;
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   if (session) {
  //     await supabase.auth.signOut();
  //   }
  //   loading = false;
  //   goto("/login", { invalidateAll: true });
  // }

  let mobileNavShow = false;
  let currentScreenSize: number; // px
  let mobileScreenSize = 576; // px
  $: mobileView = currentScreenSize <= mobileScreenSize;
  $: if (!mobileView) {
    // reset if for some reason the screen gets bigger and then
    // smaller again
    mobileNavShow = false;
  }

  $: navHidden = !loggedIn || (mobileView && !mobileNavShow);

  $: isLoading = $navigating || $pageLoading;

</script>

<svelte:window bind:innerWidth={currentScreenSize} />

<Toast />

<div id="main">
  <nav>
    <ul>
      <li
        class:nav-selected={$page.url.pathname.startsWith("/reading-list")}
      >
        <a
          href="/reading-list"
          on:click={() => (mobileNavShow = false)}
          >Reading List</a
        >
      </li>
      <li
        class:nav-selected={$page.url.pathname.startsWith("/history")}
      >
        <a
          href="/history"
          on:click={() => (mobileNavShow = false)}
          >History</a
        >
      </li>
    </ul>
  </nav>
  <slot />
</div>

<style lang="scss">

</style>
 