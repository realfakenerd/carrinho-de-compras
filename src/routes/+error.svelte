<script>
	import { page } from '$app/stores';
</script>

<h1 class="text-display-large">{$page.status}</h1>
<p class="text-headline-large">{$page?.error?.message}</p>
<p>Tente ir para o <a href="/">inicio</a></p>
