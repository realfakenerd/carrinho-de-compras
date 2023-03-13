<script>
	import { page } from '$app/stores';
</script>


<section class="w-full sm:rounded-xl bg-surface-variant p-4">
	<div class="mb-2">
		<h1 class="text-title-large">{$page.status}</h1>
		<p class="text-body-large">{$page.error?.message}</p>
	</div>
	<a class="button" href='/'>para o inicio</a>
</section>

