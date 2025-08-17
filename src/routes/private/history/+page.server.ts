import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  depends,
  locals: { supabase },
}) => {
  depends("supabase:storage:assets");

  const { data, error } = await supabase.storage
    .from("assets")
    .download("data/history.json");

  const history = JSON.parse((await data?.text()) ?? "");

  return { rows: history };
};
