<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import { authenticateAndLoadGapi } from "$lib/clients/gapi/index.js";
  import { uploadFile } from "$lib/clients/supabase";
  import { useSession } from "$lib/stores/index.js";

  const SPREADSHEET_ID = "18YrQby4F2onmSDnkjRK8jelGlGQP6oj0sGx71Dtq63U";
  export let data;
  let { supabase } = data;

  let session = useSession();

  async function runUpload(tabName: string) {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tabName}!1:9999`,
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

    let success = await uploadFile(supabase, data, tabName);

    if (success) {
      toast.push(`Uploaded file ${tabName}!`, {
        // initial: 0,
        // duration: 20000000,
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "rgba(72,187,120,0.9)",
          "--toastBarBackground": "#2F855A",
        },
        classes: ["file-uploaded-toast"],
      });
    } else {
      toast.push(`Failed to upload file ${tabName}`, {
        // initial: 0,
        // duration: 20000000,
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "rgb(218 20 82 / 78%)",
          "--toastBarBackground": "#bd2779",
        },
        classes: ["file-uploaded-toast"],
      });
    }
  }

  async function onRefresh() {
    await authenticateAndLoadGapi(session, true);

    ["reading_list", "history"].forEach(async (tabName) => {
      await runUpload(tabName);
    });
  }
</script>

<main>
  <button on:click={onRefresh}>Refresh</button>
</main>

<style lang="scss">
  :global {
    .file-uploaded-toast {
      div[role="button"] {
        background-color: #eeeeee00;
        border: 0;
        padding: 8px 12px;
        position: relative;
        margin-left: 5px;
        border-radius: 15px;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
</style>
