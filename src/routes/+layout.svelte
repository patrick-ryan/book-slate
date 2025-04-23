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
  import LoginButton from "$lib/components/login-button.svelte";

  // initialize stores
  let pageLoading = useLoading();

  // TODO: this should use a store, if any of the page load functions
  // runs and does not have a session, it should set the store value to
  // false before redirecting to /login (supports session expiration
  // while being offline, or where no refresh token exists)
  let loggedIn = false;

  let loading = false;

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

  let isGapiReady = false;
  let isGsiReady = false;
</script>

<svelte:window bind:innerWidth={currentScreenSize} />

<svelte:head>
  <script
    async
    defer
    src="https://accounts.google.com/gsi/client"
    on:load={() => (isGsiReady = true)}
  ></script>
  <script
    async
    defer
    src="https://apis.google.com/js/api.js"
    on:load={() => (isGapiReady = true)}
  ></script>
</svelte:head>

<Toast />

<div id="main">
  <nav>
    <ul>
      <li class:nav-selected={$page.url.pathname.startsWith("/reading-list")}>
        <a href="/reading-list" on:click={() => (mobileNavShow = false)}
          >Reading List</a
        >
      </li>
      <li class:nav-selected={$page.url.pathname.startsWith("/history")}>
        <a href="/history" on:click={() => (mobileNavShow = false)}>History</a>
      </li>
    </ul>
    {#if isGapiReady && isGsiReady}
      <LoginButton></LoginButton>
    {/if}
  </nav>
  <slot />
</div>

<style lang="scss">
</style>
