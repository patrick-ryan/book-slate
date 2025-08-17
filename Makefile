
gen-types:
	yes | \
	npx supabase gen types \
		typescript \
		--project-id "${SUPABASE_PROJECT_ID}" \
		--schema public \
	> src/lib/clients/supabase/database-generated.types.ts
