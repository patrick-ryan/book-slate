import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import _ from "lodash";

import type { Database } from "./database.types";

// NOTE: this global client can be shared across users, because it is using
// anonymous database access (i.e. for initial authentication)
export const supabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

// Upload file using standard upload
export async function uploadFile(o: object, key: string) {
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
