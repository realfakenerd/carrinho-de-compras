<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { auth, db } from '$lib/firebase';
	import '@fontsource/roboto';
	import { fly } from 'svelte/transition';
	import { FirebaseApp } from 'sveltefire';
	import '../app.scss';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	const routes = [
		{
			href: '/',
			name: 'home',
			d: {
				outlined: `M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z`,
				filled: `M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z`
			}
		},
		{
			href: '/pesquisa',
			name: 'Pesquisa',
			d: {
				outlined: `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`,
				filled: `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`
			}
		},
		{
			href: '/carrinho',
			name: 'carrinho',
			d: {
				outlined: `M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z`,
				filled: `M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z`
			}
		}
	];
</script>


<FirebaseApp {auth} firestore={db}>
	{#key data.currentRoute}
		<main
			class="py-10"
			in:fly={{ y: -5, duration: 500, delay: 200 }}
			out:fly={{ y: 5, duration: 200 }}
		>
			<slot />
		</main>
	{/key}

	<footer class="fixed bottom-0 z-50 w-full">
		<nav class="custom-navbar">
			{#each routes as route, index (index)}
				<a href={route.href}>
					<div
						style="background-color:{data.currentRoute === route.href ? 'hsl(220, 18%, 20%)' : ''} "
					>
						<span class="text-white">
							<span>
								<Icon d={data.currentRoute === route.href ? route.d.filled : route.d.outlined} />
							</span>
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
		@apply flex h-20 flex-none flex-grow-0 flex-row items-start gap-2 bg-base-200 py-0 px-2;
		a {
			@apply order-[0] flex h-20 flex-none flex-grow flex-col items-center justify-center gap-1 px-0 pt-3 pb-4;
			div {
				@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0 transition-all duration-300;
				&:hover {
					@apply bg-base-100;
				}
				span {
					@apply flex h-8 w-16 flex-col items-center justify-center rounded-2xl p-0;
				}
			}
			h3 {
				@apply order-1 h-4 flex-none flex-grow-0 self-stretch text-center text-xs font-medium tracking-wide;
			}
		}
	}
</style>
