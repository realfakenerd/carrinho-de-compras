<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import '../main.scss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	const routes = [
		{
			href: '/',
			name: 'home',
			d: `M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6Zm8-8.75Z`
		},
		{
			href: '/search',
			name: 'search',
			d: `m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z`
		},
		{
			href: '/profile',
			name: 'profile',
			d: `M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q13.4 15 12 15t-2.775.337Q7.85 15.675 6.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q14 8.825 14 8t-.587-1.412Q12.825 6 12 6q-.825 0-1.412.588Q10 7.175 10 8t.588 1.412Q11.175 10 12 10Zm0-2Zm0 10Z`
		}
	];
	// flex h-8 w-16 flex-col items-center justify-center rounded-full transition-colors ease-out group-hover:bg-white
	// flex flex-row justify-around gap-x-2 pb-4 pt-3
</script>

<header class="fixed bottom-0 z-10 w-full">
	<nav>
		{#each routes as route, index (index)}
			<a href={route.href}>
				<div class="{data.currentRoute === route.href ? 'bg-[#e8def8]' : ''} ">
					<span>
						<Icon d={route.d} />
					</span>
				</div>
				<h3>{route.name}</h3>
			</a>
		{/each}
	</nav>
</header>

{#key data.currentRoute}
	<main
		class="px-5 pb-40"
		in:fly={{ y: -5, duration: 250, delay: 250 }}
		out:fly={{ y: 5, duration: 250 }}
	>
		<slot />
	</main>
{/key}
