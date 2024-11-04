import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import _ from "lodash";

import type { Database } from "./database.types";

// NOTE: this global client can be shared across users, because it is using
// anonymous database access (i.e. for initial authentication)
// export const supabase = createClient<Database>(
//   PUBLIC_SUPABASE_URL,
//   PUBLIC_SUPABASE_ANON_KEY,
// );
