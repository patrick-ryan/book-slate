<script lang="ts">
  import { ActiveTable } from "active-table";
  import { onMount } from "svelte";
  import _ from "lodash";
  import { authenticateAndLoadGapi } from "$lib/clients/gapi";
  import { useSession } from "$lib/stores";

  const SPREADSHEET_ID = "18YrQby4F2onmSDnkjRK8jelGlGQP6oj0sGx71Dtq63U";
  let sheetData: any[][];
  let session = useSession();

  let isDataLoaded = false;

  async function onGetData() {
    await authenticateAndLoadGapi(session, true);

    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "reading_list!1:20",
      });
    } catch (err: any) {
      console.log(err);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      return;
    }
    // console.log(range);

    const data = range.values;

    const headers = data[0];
    const ownedIndex = _.indexOf(headers, "owned");

    // Keep the header as-is, and map over the rest to convert the "owned" field
    const updatedData = [
      headers,
      ..._.map(data.slice(1), (row) => {
        const newRow = [...row];
        newRow[ownedIndex] = row[ownedIndex].toUpperCase() === "TRUE";
        return newRow;
      }),
    ];

    sheetData = updatedData;
    isDataLoaded = true;
  }

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

  const customColumnsSettings = [
    {
      headerName: "name",
      defaultText: "Enter book name",
      availableDefaultColumnTypes: ["text"],
    },
    { headerName: "author", availableDefaultColumnTypes: ["text"] },
    {
      headerName: "owned",
      defaultColumnTypeName: "Checkbox",
      availableDefaultColumnTypes: ["Checkbox"],
    },
    { headerName: "notes", availableDefaultColumnTypes: ["text"] },
  ];

  let tableElementRef: ActiveTable;

  // $: if (tableElementRef) {
  //   tableElementRef.onDataUpdate = async (dataUpdate) => {
  //     if (isDataLoaded) {
  //       console.log("Submitting update");
  //       await gapi.client.sheets.spreadsheets.values.update({
  //         spreadsheetId: SPREADSHEET_ID,
  //         range: "reading_list!1:20",
  //         valueInputOption: "RAW",
  //         resource: {
  //           values: dataUpdate,
  //         },
  //       });
  //     }
  //   };
  // }

  async function saveData() {
    if (isDataLoaded) {
      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "reading_list!1:20",
        valueInputOption: "RAW",
        resource: {
          values: sheetData,
        },
      });
    } else {
      console.log("data not loaded, skipping save");
    }
  }
</script>

<main>
  <div>
    <button on:click={onGetData}>Get Data</button>
  </div>

  <table id="dummy" style="display: none">
    <tr><th id="dummy-header"></th></tr>
    <tr><td id="dummy-cell"></td></tr>
  </table>

  <button id="dummy-button" style="display: none"></button>

  {#if isLoaded && sheetData}
    <active-table
      bind:this={tableElementRef}
      data={sheetData}
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
    <div>
      <button on:click={saveData}>Save Data</button>
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
</style>
