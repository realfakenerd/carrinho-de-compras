<script lang="ts">
	import Icon from '@iconify/svelte';

	let wrapper: HTMLDivElement | null = null,
		textarea: HTMLTextAreaElement | null = null;

	export let value: string = '';
	export let error: boolean = false;
	export let style: 'filled' | 'outlined' = 'outlined';
	export let icon: string | null = null;
	export let trailingIcon: string | null = null;
	export let iconError: string | null = null;
	export let title: string | null = null;
	export let name: string | null = title ?? null;
	export let display: string = 'inline-flex';
	export let isTextarea: boolean = false;
	export let supportingText: string | null = null;

	let id = title ?? `input-${crypto.randomUUID()}`;

	function resize() {
		textarea!.style.height = 'unset';
		wrapper!.style.height = 'unset';
		const height = textarea?.scrollHeight + 'px';
		textarea!.style.height = height;
		wrapper!.style.height = height;
	}
</script>

<fieldset>
	<div
		class="text-field-container style-{style} {error ? 'error' : ''} {icon ? 'has-icon' : ''}"
		bind:this={wrapper}
		style="display: {display}"
	>
		{#if isTextarea}
			<textarea
				on:input
				{name}
				bind:value
				bind:this={textarea}
				{id}
				class="text-field-input"
				class:value
				required
				rows="1"
				on:input={resize}
				aria-label="Enter your input {title}"
				aria-invalid={error ? 'true' : 'false'}
			/>
		{:else}
			<input
				autocomplete="off"
				on:input
				on:keydown
				{name}
				bind:value
				class:value
				required
				type="text"
				{id}
				class="text-field-input"
				aria-label="Enter your input {title}"
				aria-invalid={error ? 'true' : 'false'}
			/>
		{/if}
		{#if icon}
			<span class="leading-icon">
				<Icon {icon} />
			</span>
		{/if}
		{#if error}
			<span class="trailing-icon">
				<Icon icon={iconError ?? ''} />
			</span>
		{/if}
		{#if trailingIcon}
			<button class="trailing-button">
				<Icon icon={trailingIcon} />
			</button>
		{/if}
		<div class="text-field-layer" />
		<label for={id}>
			{title}
		</label>
	</div>
	{#if supportingText}
		<p class="supporting {error ? 'error' : ''}">{supportingText}</p>
	{/if}
</fieldset>

<style lang="postcss">
	.text-field-container {
		@apply relative h-14 w-full min-w-[15rem] text-on-surface-variant;
	}
	.text-field-container :global(svg) {
		@apply h-6 w-6;
	}
	.text-field-input {
		@apply absolute inset-0 h-full w-full border-none bg-transparent px-4 text-on-surface outline-none;
	}
	textarea {
		@apply resize-none;
	}
	.text-field-layer {
		@apply pointer-events-none absolute inset-0 rounded-[inherit] transition-all;
	}
	label {
		transition:
			all 250ms,
			font 500ms;
		transition-timing-function: cubic-bezier(0.254, 0.029, 0, 1.2);
		color: rgb(var(--error, currentColor));
		@apply pointer-events-none absolute left-4 top-4 ease-in-out;
	}
	.error {
		--error: var(--color-error);
	}
	.supporting {
		@apply mt-1 px-4 text-label-small text-on-surface-variant;
	}
	.supporting.error {
		@apply text-error;
	}

	.style-filled {
		@apply bg-surface-variant rounded-t-lg;
	}
	.style-filled > .text-field-layer {
		color: rgb(var(--error, var(--color-on-surface-variant)));
		@apply border-b-2 border-[currentColor];
	}
	.style-filled > .text-field-input {
		@apply pb-2 pt-6;
	}
	.style-filled .text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		@apply top-2;
	}

	.style-outlined {
		@apply rounded-lg;
	}
	.style-outlined > .text-field-layer {
		color: rgb(var(--error, var(--color-outline)));
		@apply ring-1 ring-[currentColor];
	}
	.style-outlined > .text-field-input {
		@apply py-4;
	}
	.style-outlined .text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		background-color: theme('colors.surface-variant');
		@apply -top-2 left-3 px-1;
	}

	.text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		@apply text-label-small;
	}

	.text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ .leading-icon {
		@apply fill-primary;
	}

	.leading-icon,
	.trailing-icon {
		fill: rgb(var(--error, var(--color-on-surface)));
		@apply pointer-events-none inline-flex self-center transition-all duration-200;
	}
	.leading-icon {
		@apply ml-4 mr-3;
	}
	.trailing-icon {
		margin: 0 0.75rem 0 auto;
		fill: rgb(var(--error));
	}
	.trailing-button {
		fill: rgb(var(--error, var(--color-primary)));
		@apply absolute bottom-0 right-0 top-0 inline-flex w-[3.25rem] cursor-pointer items-center justify-center 
		border-none bg-transparent text-on-surface-variant transition-all duration-200;
	}
	.trailing-button:is(:focus-visible, :active) {
		background-color: rgb(var(--color-on-surface-variant) / 0.12);
	}
	.has-icon > .text-field-input {
		@apply pl-[3.25rem];
	}
	.has-icon > label {
		@apply left-[3.25rem];
	}
	.has-trailing-icon > .text-field-input {
		@apply pr-[3.25rem];
	}

	@media (hover: hover) {
		.error:hover {
			--error: var(--color-on-error-container);
		}
		.text-field-container:hover > :is(label, .text-field-layer) {
			color: rgb(var(--error, var(--color-on-surface)));
		}
		.style-filled:hover > .text-field-layer {
			background-color: rgb(var(--color-on-surface) / 0.08);
		}
		.trailing-button:hover {
			background-color: rgb(var(--color-on-surface-variant) / 0.08);
		}
	}
	.text-field-container:focus-within > :is(label, .text-field-layer) {
		color: rgb(var(--error, var(--color-primary)));
	}

	.text-field-container:focus-within > :is(.text-field-layer) {
		@apply ring-2 ring-primary;
	}

	.text-field-container {
		print-color-adjust: exact;
		-webkit-print-color-adjust: exact;
	}
	@media screen and (forced-colors: active) {
		.style-filled {
			background-color: field;
		}
	}
</style>
