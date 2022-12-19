<script lang="ts">
	import { user } from '$lib/stores/user.store';

	console.log($user);
</script>

<div class="hero min-h-screen">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="card">
			<div class="card-body">
				<h1 class="card-title">{$user?.displayName}</h1>
				<div class="avatar">
					<div class="w-24 rounded-full">
						<img src={$user?.photoURL} alt="user profile" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
