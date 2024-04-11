<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { startVideo } from './action';
	import { front, photo, video } from './stores';

	const {
		elements: { trigger, overlay, content, portalled, close },
		states: { open }
	} = createDialog();

	let taken = false;
	async function takePhoto() {
		takePicture();
		taken = true;
		setTimeout(() => (taken = false), 3000);
	}

	async function takePicture() {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const width = $video?.width ?? 0;
		const height = $video?.height ?? 0;

		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			ctx?.drawImage($video!, 0, 0, width, height);

			const data = canvas.toDataURL('image/png');
			$photo?.setAttribute('src', data);
		}
	}
</script>

<button class="icon-btn-container rounded-full" use:melt={$trigger}>
	<span class="icon-btn-filled icon-btn">
		<Icon icon="mdi:camera" />
	</span>
</button>

{#if $open}
	<div class="relative" use:melt={$portalled}>
		<div use:melt={$overlay} class="fixed inset-0 z-40 bg-black/50" transition:fade />
		<dialog
			class="fixed inset-0 z-40 flex flex-col items-center justify-center"
			use:melt={$content}
		>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video use:startVideo bind:this={$video} class="bg-surface" class:hidden={taken} />
			<section class="absolute bottom-24 z-50 flex gap-4">
				<button class="w-fit btn icon-full bg-primary" on:click={() => ($front = !$front)}>
					<Icon icon="mdi:camera-retake" />
				</button>
				<button class="w-fit btn icon-full bg-primary" on:click={takePhoto}>
					<Icon icon="mdi:camera" />
				</button>
				<button class="w-fit btn icon-full bg-primary" use:melt={$close}>
					<Icon icon="mdi:close" />
				</button>
			</section>
			<img
				bind:this={$photo}
				class:hidden={!taken}
				id="photo"
				alt="The screen capture will appear in this box."
			/>
		</dialog>
	</div>
{/if}
