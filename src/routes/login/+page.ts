// import { supabase } from "$lib/clients/supabase";
import { parseParametersFromURL } from "@supabase/auth-js/src/lib/helpers";
import { fail, redirect } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  // in case supabase-auth didn't already initiate the session post-login,
  // start a session using the token in the URL (this seems to happen
  // when going through the deep link to the mobile app for auth)
  const params = parseParametersFromURL(url.href);
  const access_token = params.access_token;
  const refresh_token = params.refresh_token;

  let session;
  // if (access_token && refresh_token) {
  //   const { data, error } = await supabase.auth.setSession({
  //     access_token,
  //     refresh_token,
  //   });
  //   session = data.session;
  // } else {
  //   const { data, error } = await supabase.auth.getSession();
  //   session = data.session;
  // }

  if (session) {
    // already authenticated
    throw redirect(303, "/");
  }

  return { session };
}) satisfies PageLoad;
