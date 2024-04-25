<script context="module">
	export let image = '';
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
		image = URL.createObjectURL(blob);
		return;
	}
</script>

<label class="btn py-10">
	<input
		class="hidden"
		type="file"
		oninput={blobify}
		accept="image/*"
		capture="user"
	/>
	<Icon icon="mdi:camera" />
</label>
