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

	node.style.width = '100%';
	node.style.height = 'auto';
	node.style.maxWidth = `${innerWidth}px`;
	node.style.maxHeight = `${innerHeight}px`;

	let stream: MediaStream | null = null;

	let promise: Promise<void> | null = null;

	const tryToStart = () => {
		if (!stream && !streaming) {
			if (!promise) {
				promise = navigator.mediaDevices
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
						promise = null;
					})
					.catch((error) => {
						const err = error as Error;
						console.error(err);
						toast.error(err.name, {
							description: err.message
						});
						promise = null;
					});
			}
		}
	};

	let streaming = false;

	tryToStart();

	return {
		destroy() {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
				stream = null;
			}
		}
	};
};

export const taken = writable(false);
export async function takePhoto() {
	takePicture();
	taken.set(true);
	setTimeout(() => taken.set(false), 3000);
}

export function takePicture() {
	const canvas = document.createElement('canvas');
	canvas.width = video!.videoWidth;
	canvas.height = video!.videoHeight;

	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(video!, 0, 0, canvas.width, canvas.height);

	const data = canvas.toDataURL('image/png');
	photo!.src = data;
}
