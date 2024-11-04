<script lang="ts">
  export let text: string;
  export let truncateLength: number = 42;

  let readMoreElement: HTMLElement;
  let readLessElement: HTMLElement;

  async function readMore(event: MouseEvent) {
    readMoreElement.style.display = "none";
    readLessElement.style.display = "inline";
  }

  async function readLess(event: MouseEvent) {
    readMoreElement.style.display = "inline";
    readLessElement.style.display = "none";
  }
</script>

{#if text.length > truncateLength}
  {text.slice(0, truncateLength)}<span bind:this={readMoreElement}
    >... <a class="common-link" href="#" on:click={readMore}>Read More</a></span
  ><span bind:this={readLessElement} style:display="none"
    >{text.slice(truncateLength)}
    <a class="common-link" href="#" on:click={readLess}>Read Less</a></span
  >
{:else}
  {text}
{/if}
