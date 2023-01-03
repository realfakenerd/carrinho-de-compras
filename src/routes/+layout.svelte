<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import '@fontsource/roboto';
	import { DarkMode, Heading, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import '../app.scss';
	import type { LayoutData } from './$types';
	import { FirebaseApp } from 'sveltefire';
	import { auth, db } from '$lib/firebase';

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

<header class="fixed z-50 w-full p-5">
	<Navbar navClass="px-5 py-3 border rounded-xl" color="dark" let:toggle let:hidden>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Carrinho de compras
			</span>
		</NavBrand>
		<div>
			<DarkMode />
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden}>
			{#each routes as route, index (index)}
				<NavLi
					active={data.currentRoute === route.href}
					class="flex flex-row items-center gap-5"
					activeClass="font-semibold"
					href={route.href}
				>
					<Icon d={data.currentRoute === route.href ? route.d.filled : route.d.outlined} />
					<Heading tag="h2" customSize="text-md" class="capitalize">{route.name}</Heading>
				</NavLi>
			{/each}
		</NavUl>
	</Navbar>
</header>

<FirebaseApp {auth} firestore={db}>
	{#key data.currentRoute}
		<main
			class="px-5 pt-28 pb-32"
			in:fly={{ y: -5, duration: 500, delay: 200 }}
			out:fly={{ y: 5, duration: 200 }}
		>
			<slot />
		</main>
	{/key}
</FirebaseApp>
