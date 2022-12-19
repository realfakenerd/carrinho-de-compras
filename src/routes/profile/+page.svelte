<script lang="ts">
	import { user } from '$lib/stores/user.store';
	import LoginHero from './LoginHero.svelte';

	import ProfileHero from './ProfileHero.svelte';
</script>

{#if $user}
	<ProfileHero />
{:else}
	<LoginHero />
{/if}
