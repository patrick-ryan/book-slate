<script lang="ts">
  import "../app.scss";
  import "@picocss/pico";
  import _ from "lodash";
  import { RefreshCwIcon } from "lucide-svelte";

  import { onMount } from "svelte";
  import { goto, invalidate } from "$app/navigation";
  import { page } from "$app/stores";

  import Toast from "$lib/components/toast.svelte";
  import LoginButton from "$lib/components/login-button.svelte";
  import LoggedInCard from "$lib/components/logged-in-card.svelte";

  export let data;
  let { session, supabase, user } = data;

  let currentScreenSize: number; // px

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:window bind:innerWidth={currentScreenSize} />

<svelte:head>
  <script async defer src="https://accounts.google.com/gsi/client"></script>
  <script async defer src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<Toast />

<div id="main">
  <nav>
    <ul>
      <li
        class:nav-selected={$page.url.pathname.startsWith(
          "/private/reading-list"
        )}
      >
        <a href="/private/reading-list">Reading List</a>
      </li>
      <li
        class:nav-selected={$page.url.pathname.startsWith("/private/history")}
      >
        <a href="/private/history">History</a>
      </li>
      <li>
        <button on:click={() => goto("/private/refresh")}
          ><RefreshCwIcon size="20"></RefreshCwIcon></button
        >
      </li>
    </ul>
    {#if user}
      <LoggedInCard
        provider="Supabase"
        userName={user.email ?? ""}
        userDetail={user.email + " / " + user.user_metadata.email_verified}
      ></LoggedInCard>
    {/if}
    <LoginButton></LoginButton>
  </nav>
  <slot />
</div>

<style lang="scss">
  #main > nav {
    display: flex;
    align-items: center;

    --pico-block-spacing-vertical: 0;

    li.nav-selected {
      background-color: var(--pico-mark-background-color);
    }
  }
</style>
