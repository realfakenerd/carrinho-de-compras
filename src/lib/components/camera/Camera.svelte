<script lang="ts">
	import Icon from '@iconify/svelte';
	import { image } from './stores';

	async function blobify(e: Event) {
		const { target } = e;
		const file = (target as HTMLInputElement).files?.item(0);

		console.log('IMAGE ANTES', $image);

		if (!file) return;

		try {
			const blob = await new Promise<Blob>((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);
				reader.onload = (e) =>
					resolve(new Blob([e.target?.result as ArrayBuffer], { type: file.type }));
				reader.onerror = (e) => reject(e);
			});
			console.log('BLOB', blob);

			$image = blob;

			console.log('IMAGE DEPOIS', $image);
		} catch (error) {
			console.error('Error creating blob:', error);
		}
	}
</script>

<label class="btn interactive-bg-primary">
	<input class="hidden" type="file" oninput={blobify} accept="image/*" capture="user" />
	<Icon icon="mdi:camera" />
</label>
