// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	/**
	 * A transition for a view, which can be skipped, and provides a promise
	 * that resolves when the transition is finished.
	 */
	interface ViewTransition {
		/**
		 * A promise that resolves when the update callback has finished executing.
		 */
		readonly updateCallbackDone: Promise<void>;

		/**
		 * A promise that resolves when the transition is ready to start.
		 */
		readonly ready: Promise<void>;

		/**
		 * A promise that resolves when the transition has finished.
		 */
		readonly finished: Promise<void>;

		/**
		 * Skip the transition.
		 */
		skipTransition(): void;
	}


	/**
	 * Start a transition for a view, which can be skipped, and provides a promise
	 * that resolves when the transition is finished.
	 * @param updateCallback A function that will be called before the transition starts.
	 * The function should return a promise that resolves when the transition is ready to start.
	 * @returns A promise that resolves when the transition is finished.
	 */
	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): Promise<void>;
	}

}
