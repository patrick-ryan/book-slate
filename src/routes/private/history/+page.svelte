<script lang="ts">
  import _ from "lodash";

  export let data;
  let { rows } = data;
</script>

<main>
  <table>
    {#if rows}
      <tr>
        {#each rows[0] as c}
          <th>{c}</th>
        {/each}
      </tr>
      {#each _.slice(rows, 1) as row}
        <tr>
          {#each row as c}
            <td>{c}</td>
          {/each}
        </tr>
      {/each}
    {/if}
  </table>
</main>

<style lang="scss">
</style>
