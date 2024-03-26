<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import '@fontsource/roboto';
	import Icon, { enableCache } from '@iconify/svelte';
	import { navdown } from 'navdown';
	import { FirebaseApp } from 'sveltefire';
	import '../app.css';
	export let data;

	enableCache('all');
	// onNavigate((navigation) => {
	// 	if (!document.startViewTransition) return;
	// 	return new Promise((resolve) => {
	// 		document.startViewTransition(async () => {
	// 			resolve();
	// 			await navigation.complete;
	// 		});
	// 	});
	// });

	const routes = [
		{
			href: '/',
			name: 'home',
			d: {
				outlined: `mdi:home-variant-outline`,
				filled: `mdi:home-variant`
			}
		},
		// {
		// 	href: '/pesquisa',
		// 	name: 'Pesquisa',
		// 	d: {
		// 		outlined: `mdi:search`,
		// 		filled: `mdi:search`
		// 	}
		// },
		{
			href: '/carrinho',
			name: 'carrinho',
			d: {
				outlined: `mdi:local-grocery-store`,
				filled: `mdi:local-grocery-store`
			}
		}
	];
</script>

<FirebaseApp {auth} firestore={db}>
	<main class="flex-1 relative min-h-dvh">
		<slot />
	</main>

	<footer class="fixed bottom-0 z-[999] w-full">
		<nav use:navdown class="custom-navbar">
			{#each routes as route, index (index)}
				<a href={route.href} class="group">
					<div
						class="group-hover:bg-secondary"
						style="background-color:{data.currentRoute === route.href ? 'rgb(var(--color-secondary))' : ''}; color: {data.currentRoute === route.href ? 'rgb(var(--color-on-secondary))' : ''};"
					>
						<span class="fill-on-background group-hover:fill-on-secondary">
							<Icon width="24px" icon={data.currentRoute === route.href ? route.d.filled : route.d.outlined} />
						</span>
					</div>
					<h3>{route.name}</h3>
				</a>
			{/each}
		</nav>
	</footer>
</FirebaseApp>

<style lang="scss">
	.custom-navbar {
		@apply flex h-20 flex-none flex-grow-0 flex-row items-start gap-2 bg-surface-variant py-0 px-2;
		a {
			@apply flex h-20 flex-none flex-grow flex-col items-center justify-center gap-1 px-0 pt-3 pb-4;
			div {
				@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0 transition-all duration-300;

				span {
					@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0;
				}
			}
			h3 {
				@apply h-4 flex-none flex-grow-0 self-stretch text-center text-xs font-medium tracking-wide;
			}
		}
	}
</style>
