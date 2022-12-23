<script lang="ts">
	import { auth } from '$lib/firebase';
	import user from '$lib/stores/user.store';
	import { signOut } from 'firebase/auth';

	async function logout() {
		await signOut(auth);
	}
</script>

<div class="hero">
	<div class="hero-content">
		<div class="card w-full bg-base-200">
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
		</div>
	</div>
</div>
