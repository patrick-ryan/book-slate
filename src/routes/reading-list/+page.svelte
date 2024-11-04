<script lang="ts">
  import { ActiveTable } from "active-table";
  import { onMount } from "svelte";

  let tableStyle = {};
  let headerStyles = {};
  let cellStyle = {};
  let fileButtonStyle = {};

  // Make sure to use onMount and render active-table on load
  onMount(async () => {
    await import("active-table");

    const dummyTable = document.getElementById("dummy");
    const dummyHeader = document.getElementById("dummy-header");
    const dummyCell = document.getElementById("dummy-cell");
    const dummyButton = document.getElementById("dummy-button");

    if (dummyTable && dummyHeader && dummyCell && dummyButton) {
      // Get computed styles of the element
      const computedStyles = getComputedStyle(dummyTable);
      const headerComputedStyles = getComputedStyle(dummyHeader);
      const cellComputedStyles = getComputedStyle(dummyCell);
      const buttonComputedStyles = getComputedStyle(dummyButton);

      // Convert specific styles to an object
      tableStyle = {
        borderRadius: "10px",
        border: computedStyles.border,
        boxShadow: "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px",
        width: "100%",
        overflow: "hidden",
      };

      headerStyles = {
        default: { backgroundColor: headerComputedStyles.backgroundColor },
        hoverColors: { backgroundColor: "#0a1e47" },
      };

      cellStyle = {
        // backgroundColor: cellComputedStyles.backgroundColor,
        color: cellComputedStyles.color,
      };

      fileButtonStyle = {
        default: {
          backgroundColor: buttonComputedStyles.backgroundColor,
          border: buttonComputedStyles.border,
          color: buttonComputedStyles.color,
          stroke: buttonComputedStyles.stroke,
          marginTop: buttonComputedStyles.marginTop,
          borderRadius: buttonComputedStyles.borderRadius,
        },
        hover: {
          backgroundColor: buttonComputedStyles.backgroundColor,
          border: buttonComputedStyles.border,
          color: buttonComputedStyles.color,
          stroke: buttonComputedStyles.stroke,
          marginTop: buttonComputedStyles.marginTop,
          borderRadius: buttonComputedStyles.borderRadius,
        },
      };
    }

    isLoaded = true;
  });

  let isLoaded = false;
  const data = [
    ["Name", "Author", "Owned", "Notes"],
    ["Earth", 12756, false, null],
    ["Mars", 6792, true, null],
  ];

  const customColumnsSettings = [
    {
      headerName: "Name",
      defaultText: "Enter book name",
      availableDefaultColumnTypes: ["text"],
    },
    { headerName: "Author", availableDefaultColumnTypes: ["text"] },
    { headerName: "Owned", availableDefaultColumnTypes: ["checkbox"] },
    { headerName: "Notes", availableDefaultColumnTypes: ["text"] },
  ];

  let tableElementRef: ActiveTable;

  $: if (tableElementRef) {
    tableElementRef.onDataUpdate = (dataUpdate) => {
      console.log(dataUpdate);
    };
  }

  // function handleImportCSV() {
  //   tableElementRef.importFile();
  // }
</script>

<main>
  <table id="dummy" style="display: none">
    <tr><th id="dummy-header"></th></tr>
    <tr><td id="dummy-cell"></td></tr>
  </table>

  <button id="dummy-button" style="display: none"></button>

  {#if isLoaded}
    <!-- <button on:click={handleImportCSV}> Import CSV </button> -->

    <active-table
      bind:this={tableElementRef}
      {data}
      {customColumnsSettings}
      isColumnResizable={false}
      isHeaderTextEditable={false}
      columnDropdown={{
        isSortAvailable: true,
        isDeleteAvailable: false,
        isInsertLeftAvailable: false,
        isInsertRightAvailable: false,
        isMoveAvailable: false,
      }}
      displayAddNewColumn={false}
      {headerStyles}
      {cellStyle}
      {tableStyle}
      stripedRows={{
        odd: { backgroundColor: "#2e3c60" },
        even: { backgroundColor: "#242b4a" },
      }}
      files={{
        buttons: [
          {
            import: {
              overwriteOptions: {
                importRowStartIndex: 1,
                tableRowStartIndex: -1,
              },
            },
            styles: fileButtonStyle,
          },
        ],
      }}
    />
  {/if}
</main>

<style>
  main {
    padding-top: 1rem;
  }
</style>
