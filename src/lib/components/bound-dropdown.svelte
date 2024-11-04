<script lang="ts">
  import _ from "lodash";
  import { createEventDispatcher, onMount } from "svelte";

  export let name: string;
  export let options: any[];
  export let defaultOption: any = null;
  export let optionDisplayProp: string | null = null;

  let label = `Select a ${name}`;

  let selectorValue: any = defaultOption;
  let selectorIsOpen: boolean = false;

  function setDefault(value: any) {
    // intentionally not included directly in reactive block -
    // would trigger whenever `selectorValue` is updated
    selectorValue = value;
  }

  $: if (options && defaultOption) {
    setDefault(defaultOption);
  }

  const dispatch = createEventDispatcher<{
    dropdownSelect: { value: any };
  }>();

  function sendEvent(newValue: any) {
    // intentionally not included directly in reactive block -
    // would trigger whenever `selectorIsOpen` is updated
    dispatch("dropdownSelect", { value: newValue });
    selectorIsOpen = false;
  }

  onMount(() => {
    if (defaultOption) {
      sendEvent(defaultOption);
    }
  });

  $: if (selectorValue) {
    sendEvent(selectorValue);
  }

  function displayValue(value: any): string {
    return optionDisplayProp ? value[optionDisplayProp] : _.startCase(value);
  }
</script>

<details bind:open={selectorIsOpen} class="dropdown" aria-label={label}>
  <summary role="button" class="outline">
    <span>
      {selectorValue ? displayValue(selectorValue) : label}
    </span>
  </summary>
  <ul>
    {#each options as option}
      <li>
        <label>
          <input
            type="radio"
            name={`${name}_selector`}
            value={option}
            bind:group={selectorValue}
          />
          {displayValue(option)}
        </label>
      </li>
    {/each}
  </ul>
</details>

<style lang="scss">
  details {
    width: 100%;

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 1.6rem 0.25rem 0.5rem;

      max-width: 10rem;

      > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        // leave enough room for ellipsis
        max-width: 8rem;
      }

      &::after {
        margin-right: -1.25rem;
      }
    }

    li {
      display: flex;

      padding: 0;

      label {
        display: flex;
        align-items: center;

        // ensure full clickable area coverage
        flex-grow: 1;
        padding: calc(var(--pico-form-element-spacing-vertical) * 0.5)
          var(--pico-form-element-spacing-horizontal);
        margin: 0;

        input {
          margin-right: 1rem;
        }
      }
    }
  }
</style>
