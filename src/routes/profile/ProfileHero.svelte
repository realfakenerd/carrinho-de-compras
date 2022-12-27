<script lang="ts">
	
import { auth } from '$lib/firebase';
	import user from '$lib/stores/user.store';
	import { signOut } from 'firebase/auth';
	import { Avatar, Card,Heading, Button } from 'flowbite-svelte';

	async function logout() {
		await signOut(auth);
	}
</script>

<div class="hero">
	<div class="hero-content">

		<Card>
			<div class="flex flex-col items-center pb-4 space-y-3">
				<Avatar size="lg" img={$user?.photoURL} />
				<Heading tag='h1' customSize="text-xl">{$user?.displayName}</Heading>

				<Button on:click={logout} class="w-full">logout</Button>
			</div>
		</Card>
		<!-- <div class="card w-full bg-base-200">
			<figure class="avatar pt-10">
				<div class="w-24 rounded-full">
					<img src={$user?.photoURL} alt="user profile" />
				</div>
			</figure>
			<div class="card-body ">
				<h1 class="card-title">{$user?.displayName}</h1>
				<section>
					<p>email: {$user?.email}</p>
					<p>telefone: {$user?.phoneNumber ? $user.phoneNumber : ''}</p>
				</section>

				<div class="card-actions">
					<button on:click={logout} class="btn btn-error btn-block"> logout </button>
				</div>
			</div>
		</div> -->
	</div>
</div>

<style lang="scss">
	.hero {
		@apply grid w-full place-items-center bg-cover bg-center;
		& > * {
			@apply col-start-1 row-start-1;
		}
		&-overlay {
			@apply col-start-1 row-start-1 h-full w-full;
		}
		&-content {
			@apply z-0 flex items-center justify-center w-full;
		}
	}
</style>
