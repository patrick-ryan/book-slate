<script lang="ts">
  export let provider: string;
  export let userName: string;
  export let userDetail: string;
</script>

<div id="main">
  <article>
    <header>
      {provider}: Signed in as {userName}
    </header>
    <main><small>{userDetail}</small></main>
  </article>
</div>
