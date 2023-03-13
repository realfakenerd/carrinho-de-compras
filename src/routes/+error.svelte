<script>
	import { page } from '$app/stores';
</script>

<div>
	<div>
		<section>
			<h1>{$page.status}</h1>
			<p>{$page.error?.message}</p>
		</section>
	</div>
</div>
