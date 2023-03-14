<script>
	import { page } from '$app/stores';
</script>

<section class="w-full bg-error p-4 sm:rounded-xl">
	<div class="mb-2">
		<h1 class="text-title-large text-on-error">{$page.status}</h1>
		<p class="text-body-large text-on-error">{$page.error?.message}</p>
	</div>
	<a href="/">Para o inicio</a>
</section>

<style lang="postcss">
	a {
		@apply flex items-center justify-center rounded-[100px]  bg-error-container py-3  px-6 text-on-error-container transition;
	}

	a:hover {
		@apply bg-error-container/70;
	}
</style>
