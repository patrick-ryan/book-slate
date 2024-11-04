<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style lang="scss">
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 2rem;
    --toastContainerBottom: 1rem;
    // --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
