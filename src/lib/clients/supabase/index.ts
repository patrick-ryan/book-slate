import { SupabaseClient } from "@supabase/supabase-js";

// Upload file using standard upload
export async function uploadFile(
  supabase: SupabaseClient,
  o: object,
  key: string
) {
  const fname = `${key}.json`;
  const contentType = "application/json";

  const blob = new Blob([JSON.stringify(o, null, 2)], {
    type: contentType,
  });

  const file = new File([blob], fname, {
    type: contentType,
  });

  const { data, error } = await supabase.storage
    .from("assets")
    .upload(`data/${fname}`, file, {
      contentType: contentType,
      upsert: true,
    });
  if (error) {
    // Handle error
    console.log(error);
  } else {
    // Handle success
    console.log("file upload success");
  }
}
