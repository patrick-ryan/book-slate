<script>
    import { page } from '$app/stores';
</script>

We're experiencing issues.

<h1>{$page.status}: {$page.error?.message}</h1>
