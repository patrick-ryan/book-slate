// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './lib/clients/supabase/database.types'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>
            getSession(): Promise<Session | null>
        }
        interface PageData {
            session: Session | null
        }
        // interface Error {}
        // interface Platform {}
    }
}

export {};
