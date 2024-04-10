<script lang="ts">
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { melt, createDialog } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import type { Action } from 'svelte/action';

	let video: HTMLVideoElement | null = null;
	let photo: HTMLImageElement;
	let front = false;

	const {
		elements: { trigger, overlay, content, portalled },
		states: { open }
	} = createDialog();

	async function takePhoto() {
		// takePicture();
		/** empty */
	}

	async function playVideo(width: number, height: number) {
		let stream: MediaStream;

		console.log('playVideo', width, height, width / height);
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					height: {
						ideal: height
					},
					width: {
						ideal: width
					},
					facingMode: front ? 'user' : 'environment'
				},
				audio: false
			});

			video!.srcObject = stream;
			video?.play();
		} catch (error) {
			const err = error as Error;
			console.error(err);
			toast.error(err.name, {
				description: err.message
			});
		}
	}

	async function clearPicture(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		ctx!.fillStyle = '#AAA';
		ctx?.fillRect(0, 0, canvas.width, canvas.height);

		const data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	// async function takePicture() {
	// 	const canvas = document.createElement('canvas');
	// 	const ctx = canvas.getContext('2d');
	// 	if (video?.width && video?.height) {
	// 		canvas.width = width;
	// 		canvas.height = height;
	// 		ctx?.drawImage(video, 0, 0, width, height);
	// 		const data = canvas.toDataURL('image/png');
	// 		photo.setAttribute('src', data);

	// 		console.log(data);
	// 	} else {
	// 		clearPicture(canvas);
	// 	}
	// }

	$: devices = [] as MediaDeviceInfo[];
	onMount(async () => {
		devices = await navigator.mediaDevices.enumerateDevices();
	});

	const startVideo: Action<HTMLVideoElement> = (node) => {
		node.width = window.innerWidth;
		node.height = window.innerHeight;
		let streaming = false;

		if (!streaming) {
			streaming = true;
			playVideo(node.width, node.height);
		}

		return {
			destroy() {
				node.pause();
				video!.srcObject = null;
				video = null;
				streaming = false;
			}
		};
	};
</script>

<button class="icon-btn-container" use:melt={$trigger}>
	<span class="icon-btn-filled icon-btn">
		<Icon icon="mdi:camera" />
	</span>
</button>

{#if $open}
	<div class="relative" use:melt={$portalled}>
		<div use:melt={$overlay} class="fixed inset-0 z-40 bg-black/50" transition:fade />
		<dialog class="fixed inset-0 z-40 flex flex-col items-center justify-center" use:melt={$content}>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video use:startVideo bind:this={video} class="bg-error"/>
			<button class="absolute bottom-24 w-fit btn btn-filled z-50" on:click={() => (front = !front)}>Flip</button>
		</dialog>
	</div>
{/if}

<!-- 
<div>
	<video use:startVideo bind:this={video}>Video stream not available</video>
	<button class="icon-btn-container" on:click|preventDefault={takePhoto}>
		<span class="icon-btn-filled icon-btn">
			<Icon icon="mdi:camera" />
		</span>
	</button>
	<button class="icon-btn-container" on:click={() => video.pause()}>
		<span class="icon-btn-filled icon-btn">
			<Icon icon="mdi:close" />
		</span>
	</button>
</div>

{#if devices.length}
	<select bind:value={devices[0]}>
		{#each devices as device}
			<option value={device}>
				{device.label}
			</option>
		{/each}
	</select>
{/if}

<div class="output">
	<img bind:this={photo} id="photo" alt="The screen capture will appear in this box." />
</div> -->
