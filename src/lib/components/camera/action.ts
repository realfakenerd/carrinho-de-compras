import { toast } from 'svelte-sonner';
import type { Action } from 'svelte/action';
import { writable } from 'svelte/store';
import { front as _front, photo as _photo, video as _video } from './stores';

let front: boolean;
let video: HTMLVideoElement | null;
let photo: HTMLImageElement | null;
_photo.subscribe((v) => (photo = v));
_video.subscribe((v) => (video = v));
_front.subscribe((v) => (front = v));

export const startVideo: Action<HTMLVideoElement> = (node) => {
	const innerWidth = window.innerWidth;
	const innerHeight = window.innerHeight;

	node.width = innerWidth;
	node.height = innerHeight;
	node.style.width = `${innerWidth}px`;
	node.style.height = `${innerHeight}px`;

	let streaming = false;
	let stream: MediaStream | null = null;

	if (!streaming) {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					facingMode: front ? 'user' : 'environment'
				},
				audio: false
			})
			.then((_stream) => {
				stream = _stream;
				node.srcObject = _stream;
				node.play();
				streaming = true;
			})
			.catch((error) => {
				const err = error as Error;
				console.error(err);
				toast.error(err.name, {
					description: err.message
				});
			});
	}

	return {
		destroy() {
			node.pause();
			streaming = false;
			stream?.getTracks().forEach((track) => track.stop());
		}
	};
};

export const taken = writable(false);
export async function takePhoto() {
	takePicture();
	taken.set(true);
	setTimeout(() => taken.set(false), 9999);
}

export async function takePicture() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const width = 800;
	const height = 600;

	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		ctx?.drawImage(video!, 0, 0, width, height);

		const data = canvas.toDataURL('image/png');
		photo?.setAttribute('src', data);
	}
}
