<script lang="ts">
  import { authenticateAndLoadGapi } from "$lib/clients/gapi";
  import { useSession } from "$lib/stores";
  import LoggedInCard from "./logged-in-card.svelte";

  let session = useSession();
</script>

<div id="main">
  {#if $session && $session.user && $session.loggedIn == true}
    <LoggedInCard
      provider="Google"
      userName={$session.user.displayName ?? ""}
      userDetail={$session.user.email ?? ""}
    ></LoggedInCard>
  {:else}
    <button on:click={() => authenticateAndLoadGapi(session, false)}
      >Sign in</button
    >
  {/if}
</div>
