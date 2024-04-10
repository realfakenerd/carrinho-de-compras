import { toast } from 'svelte-sonner';
import type { Action } from 'svelte/action';
import { front as _front } from './stores';

let front: boolean;

_front.subscribe((v) => (front = v));

export const startVideo: Action<HTMLVideoElement> = (node) => {
	node.width = window.innerWidth;
	node.height = window.innerHeight;
	let streaming = false;
	let stream: MediaStream | null = null;

	if (!streaming) {
		console.log(front);

		navigator.mediaDevices
			.getUserMedia({
				video: {
					height: {
						ideal: window.innerHeight
					},
					width: {
						ideal: window.innerWidth
					},
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
