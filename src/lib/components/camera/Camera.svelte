<script lang="ts">
	import Icon from '@iconify/svelte';
	import { URL } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';
	import { image } from './stores';

	let src = $state<string | null>(null);

	async function blobify(e: Event) {
		const { target } = e;
		const file = (target as HTMLInputElement).files?.item(0);

		if (!file) return;

		try {
			const blob = await new Promise<Blob>((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);
				reader.onload = (e) =>
					resolve(new Blob([e.target?.result as ArrayBuffer], { type: file.type }));
				reader.onerror = (e) => reject(e);
			});

			$image = blob;
			src = URL.createObjectURL(blob);
			setTimeout(() => {
				if (src) URL.revokeObjectURL(src);
				src = null;
			}, 5000);
		} catch (error) {
			console.error('Error creating blob:', error);
		}
	}
</script>

<section class="flex flex-col gap-2">
	<figure>
		{#if src}
			<img
				style="height: 238px;"
				class="rounded-lg object-cover"
				in:fade
				out:fly={{ duration: 500, y: -10 }}
				{src}
				alt="#"
			/>
		{/if}
	</figure>

	<label class="btn interactive-bg-primary">
		<input class="hidden" type="file" oninput={blobify} accept="image/*" capture="user" />
		<span>Tire uma foto</span>
		<Icon icon="mdi:camera" />
	</label>
</section>
