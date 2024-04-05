<script lang="ts">
	import Icon, { enableCache } from '@iconify/svelte';
	import { navdown } from 'navdown';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	export let data;

	enableCache('all');
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
			href: '/carrinho',
			name: 'carrinho',
			d: {
				outlined: `mdi:local-grocery-store`,
				filled: `mdi:local-grocery-store`
			}
		}
	];
</script>

<main class="flex-1 relative min-h-dvh">
	<slot />
</main>

<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast:
				'min-h-[48px] max-h-[68px] shadow-md p-4 bg-surface rounded-md flex flex-row-reverse items-center justify-between',
			title: 'text-label-large',
			description: 'text-body-medium'
		}
	}}
	richColors
	theme="dark"
	closeButton
	visibleToasts={1}
	duration={1600}
>
	<Icon width="24px" height="24px" icon="mdi:check" slot="success-icon" />
	<Icon width="24px" height="24px" icon="mdi:information" slot="info-icon" />
</Toaster>

<footer use:navdown style="view-transition-name: footer;" class="fixed bottom-0 z-[999] w-full">
	<nav class="custom-navbar">
		{#each routes as { d, href, name } (href)}
			<a {href} class="group">
				<div
					class="group-hover:bg-secondary"
					style="background-color:{data.currentRoute === href
						? 'rgb(var(--color-secondary))'
						: ''}; color: {data.currentRoute === href ? 'rgb(var(--color-on-secondary))' : ''};"
				>
					<span class="fill-on-background group-hover:fill-on-secondary">
						<Icon width="24px" icon={data.currentRoute === href ? d.filled : d.outlined} />
					</span>
				</div>
				<h3>{name}</h3>
			</a>
		{/each}
	</nav>
</footer>

<style>
	.custom-navbar {
		display: flex;
		flex-direction: row;
		align-items: start;
		flex: none;
		flex-grow: 0;
		gap: 0.5rem;
		background-color: theme('colors.surface-variant');
		padding-block: 0;
		padding-inline: 0.5rem;
		height: 5rem;

		& a {
			display: flex;
			height: 5rem;
			flex: none;
			flex-grow: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.25rem;
			padding-block-start: 0.75rem;
			padding-block-end: 1rem;
			padding-inline: 0;

			& div {
				display: flex;
				height: 2rem;
				width: 4rem;
				align-items: center;
				justify-content: center;
				border-radius: 16px;
				transition: background-color 300ms ease-in-out;

				& span {
					display: flex;
					height: 2rem;
					width: 4rem;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-radius: 16px;
					padding: 0;
				}
			}
			& h3 {
				height: 1rem;
				flex: none;
				flex-grow: 0;
				align-items: stretch;
				text-transform: capitalize;
				text-align: center;

				@apply text-label-medium;
			}
		}
	}
</style>
