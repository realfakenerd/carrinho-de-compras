<script lang="ts">
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	let video: HTMLVideoElement;
	let streaming = false;
	let photo: HTMLImageElement;
	let width = 320;
	let height = 0;

	async function takePhoto() {
		takePicture();
	}

	async function playVideo() {
		let stream: MediaStream;

		try {
			stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
			video.srcObject = stream;
			video.play();
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

	async function takePicture() {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			ctx?.drawImage(video, 0, 0, width, height);
			const data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data);

			console.log(data);
			
		} else {
			clearPicture(canvas);
		}
	}

	function startVideo(node: HTMLVideoElement) {
		playVideo();
		if (!streaming) {
			height = (node.videoHeight / node.videoWidth) * width;
			if (isNaN(height)) {
				height = width / (4 / 3);
			}
			node.setAttribute('width', width.toString());
			node.setAttribute('height', height.toString());

			streaming = true;
		}
	}
</script>

<div>
	<!-- svelte-ignore a11y-media-has-caption -->
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

<div class="output">
	<img bind:this={photo} id="photo" alt="The screen capture will appear in this box." />
</div>
