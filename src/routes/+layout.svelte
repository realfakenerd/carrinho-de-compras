<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Icon, {enableCache} from '@iconify/svelte';
	import { auth, db } from '$lib/firebase';
	import '@fontsource/roboto';
	import { FirebaseApp } from 'sveltefire';
	import '../app.scss';
	export let data;

	enableCache('all')
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const routes = [
		{
			href: '/',
			name: 'home',
			d: {
				outlined: `mdi:home-variant-outline`,
				filled: `mdi:home-variant`
			}
		},
		{
			href: '/pesquisa',
			name: 'Pesquisa',
			d: {
				outlined: `mdi:search`,
				filled: `mdi:search`
			}
		},
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
		<main
			style="view-transition-name: card;"
			class="pt-8 pb-24 sm:px-4"
		>
			<slot />
		</main>

	<footer class="fixed bottom-0 z-50 w-full">
		<nav class="custom-navbar">
			{#each routes as route, index (index)}
				<a href={route.href} class="group">
					<div
						class="group-hover:bg-secondary"
						style="background-color:{data.currentRoute === route.href ? '#4A4458' : ''} "
					>
						<span class="fill-on-background group-hover:fill-on-secondary">
							<Icon icon={data.currentRoute === route.href ? route.d.filled : route.d.outlined} />
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
		@apply flex h-20 flex-none flex-grow-0 flex-row items-start gap-2 bg-surface-2 py-0 px-2;
		a {
			@apply order-[0] flex h-20 flex-none flex-grow flex-col items-center justify-center gap-1 px-0 pt-3 pb-4;
			div {
				@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0 transition-all duration-300;

				span {
					@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0;
				}
			}
			h3 {
				@apply order-1 h-4 flex-none flex-grow-0 self-stretch text-center text-xs font-medium tracking-wide;
			}
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateY(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateY(-30px);
		}
	}

	:root::view-transition-old(card) {
		animation:
			110ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			250ms cubic-bezier(0.291, 0.281, 0, 1.2) both slide-to-left;
	}

	:root::view-transition-new(card) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			500ms cubic-bezier(0.291, 0.281, 0, 1.2) both slide-from-right;
	}
</style>
