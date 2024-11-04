
gen-types:
	yes | \
	npx supabase gen types \
		typescript \
		--project-id "fixoevulmgguvhsowftt" \
		--schema public \
	> src/lib/clients/supabase/database-generated.types.ts
