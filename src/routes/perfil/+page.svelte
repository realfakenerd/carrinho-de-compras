<script lang="ts">
	import user from '$lib/stores/user.store';
	import LoginHero from './LoginHero.svelte';
	import ProfileHero from './ProfileHero.svelte';
	import {User} from 'sveltefire';
</script>

<User let:user>
	<ProfileHero />
	<LoginHero slot="signedOut"/>
</User>
