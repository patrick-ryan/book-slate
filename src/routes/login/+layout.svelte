<script lang="ts">

</script>

<svelte:head>
  <title>Abode: Login</title>
</svelte:head>

<div id="main" class="container" style="padding: 50px 0 100px 0">
  <slot />
</div>

<style lang="scss">
  // quickstart CSS for supabase auth form (TODO: simplify, switch to pico or tailwind)

  /* Grid */

  #main {
    position: relative;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
  }
  #background {
    position: absolute;
    z-index: 1;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    height: 90%;
    width: 100%;
    overflow: hidden;

    padding-bottom: 1.25rem;

    > img {
      display: flex;

      width: 90%;

      max-height: 425px;
      max-width: 425px;

      opacity: 10%;
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 225, 0.4));
    }
    > img.dark {
      opacity: 5%;
    }
  }
</style>
