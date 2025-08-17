<script lang="ts">
  import { uploadFile } from "$lib/clients/supabase";

  const SPREADSHEET_ID = "18YrQby4F2onmSDnkjRK8jelGlGQP6oj0sGx71Dtq63U";
  export let data;
  let { supabase } = data;

  async function onRefresh() {
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

    await uploadFile(supabase, data, "reading_list");
  }
</script>

<main>
  <button on:click={onRefresh}>Refresh</button>
</main>
