<script>
	import { page } from '$app/stores';
	import { Heading, P } from 'flowbite-svelte';
</script>

<div class="hero">
	<div class="hero-content">
		<section>
			<Heading tag="h1">{$page.status}</Heading>
			<P>{$page.error?.message}</P>
		</section>
	</div>
</div>
