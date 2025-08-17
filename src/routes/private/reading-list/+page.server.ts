import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  depends,
  locals: { supabase },
}) => {
  depends("supabase:storage:assets");

  const { data, error } = await supabase.storage
    .from("assets")
    .download("data/reading_list.json");

  const reading_list = await data?.text();

  return { reading_list };
};
