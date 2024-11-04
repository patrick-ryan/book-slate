<script lang="ts">
  // this probably could be using the `useSidebarOpen` store directly,
  // but it's somewhat nice being self-contained, especially in the case
  // of multiple sidebars
  export let open = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<aside
  class="absolute border-r-2 shadow-lg"
  class:open
  on:click|stopPropagation
>
  <slot />
</aside>

<style lang="scss">
  aside {
    top: 0;
    right: -100%;
    transition: right 0.3s ease-in-out;

    height: 100%;
    z-index: 3;

    // width: 576px;
    width: 100%;
    background-color: var(--pico-card-background-color);

  }

  .open {
    right: 0;
  }
</style>
