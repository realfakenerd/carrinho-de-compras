<script lang="ts">
	import user from '$lib/stores/user.store';

	console.log($user);
</script>

<div class="hero">
	<div class="hero-content">
		<div class="card bg-base-200 w-full">
			<figure class="avatar pt-10">
				<div class="w-24 rounded-full">
					<img src={$user?.photoURL} alt="user profile" />
				</div>
			</figure>
			<div class="card-body ">
				<h1 class="card-title">{$user?.displayName}</h1>
				<p>{$user?.email}</p>
				
			</div>
		</div>
	</div>
</div>
