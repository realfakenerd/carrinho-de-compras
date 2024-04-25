<script context="module">
	export let image: Blob | null;
</script>

<script lang="ts">
	import Icon from "@iconify/svelte";

	async function blobify(e: Event) {
		const { files } = e.target as HTMLInputElement;
		const file = files?.item(0);

		if (!file) return;

		const buffer = await file.arrayBuffer();
		if (!buffer) return;

		const uarr = new Uint8Array(buffer);
		const blob = new Blob([uarr], { type: file.type });
		image = blob;
		return;
	}
</script>

<label class="btn interactive-bg-primary">
	<input
		class="hidden"
		type="file"
		oninput={blobify}
		accept="image/*"
		capture="user"
	/>
	<Icon icon="mdi:camera" />
</label>
