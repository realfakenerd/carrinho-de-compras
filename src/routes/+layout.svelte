<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { fly } from 'svelte/transition';
	import "@fontsource/roboto"
	import '../app.scss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	const routes = [
		{
			href: '/',
			name: 'home',
			d: {
				outlined: `M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6Zm8-8.75Z`,
				filled: `M4 21V9l8-6 8 6v12h-6v-7h-4v7Z`
			}
		},
		{
			href: '/search',
			name: 'search',
			d: {
				outlined: `m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z`,
				filled: `m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z`
			}
		},
		{
			href: '/profile',
			name: 'profile',
			d: {
				outlined: `M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q13.4 15 12 15t-2.775.337Q7.85 15.675 6.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q14 8.825 14 8t-.587-1.412Q12.825 6 12 6q-.825 0-1.412.588Q10 7.175 10 8t.588 1.412Q11.175 10 12 10Zm0-2Zm0 10Z`,
				filled: `M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Z`
			}
		},
		{
			href: '/carrinho',
			name: 'carrinho',
			d: {
				outlined: `M7 22q-.825 0-1.412-.587Q5 20.825 5 20q0-.825.588-1.413Q6.175 18 7 18t1.412.587Q9 19.175 9 20q0 .825-.588 1.413Q7.825 22 7 22Zm10 0q-.825 0-1.412-.587Q15 20.825 15 20q0-.825.588-1.413Q16.175 18 17 18t1.413.587Q19 19.175 19 20q0 .825-.587 1.413Q17.825 22 17 22ZM6.15 6l2.4 5h7l2.75-5ZM5.2 4h14.75q.575 0 .875.512.3.513.025 1.038l-3.55 6.4q-.275.5-.738.775Q16.1 13 15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.988-.575-.987-.05-1.962L6.6 11.6 3 4H1V2h3.25Zm3.35 7h7Z`,
				filled: `M7 22q-.825 0-1.412-.587Q5 20.825 5 20q0-.825.588-1.413Q6.175 18 7 18t1.412.587Q9 19.175 9 20q0 .825-.588 1.413Q7.825 22 7 22Zm10 0q-.825 0-1.412-.587Q15 20.825 15 20q0-.825.588-1.413Q16.175 18 17 18t1.413.587Q19 19.175 19 20q0 .825-.587 1.413Q17.825 22 17 22ZM5.2 4h14.75q.575 0 .875.512.3.513.025 1.038l-3.55 6.4q-.275.5-.738.775Q16.1 13 15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.988-.575-.987-.05-1.962L6.6 11.6 3 4H1V2h3.25Z`
			}
		}
	];
</script>

{#key data.currentRoute}
	<main
		class=" px-5 pt-10 pb-32"
		in:fly={{ y: -5, duration: 500, delay: 200 }}
		out:fly={{ y: 5, duration: 200 }}
	>
		<slot />
	</main>
{/key}

<footer>
	<nav class="custom-navbar">
		{#each routes as route, index (index)}
			<a href={route.href}>
				<div
					style="background-color:{data.currentRoute === route.href ? 'hsl(220, 18%, 20%)' : ''} "
				>
					<span>
						<Icon d={data.currentRoute === route.href ? route.d.filled : route.d.outlined} />
					</span>
				</div>
				<h3>{route.name}</h3>
			</a>
		{/each}
	</nav>
</footer>

<style lang="scss">
	footer {
		@apply fixed bottom-0 z-20 w-full;
	}

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
