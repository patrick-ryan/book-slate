<script lang="ts">
  import { authenticateAndLoadGapi } from "$lib/clients/gapi";
  import { useSession } from "$lib/stores";

  let session = useSession();
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
    <button on:click={() => authenticateAndLoadGapi(session, false)}
      >Sign in</button
    >
  {/if}
</div>

<style lang="scss">
  #main {
    display: flex;
    align-items: center;

    --pico-block-spacing-vertical: 0;
  }
</style>
