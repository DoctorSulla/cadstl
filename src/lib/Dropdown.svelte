<script lang="ts" generics="T extends string | number">
	interface Option<V> {
		value: V;
		label: string;
	}

	interface Props {
		options: Option<T>[];
		value: T;
		onchange?: () => void;
		ariaLabel?: string;
	}

	let { options, value = $bindable(), onchange, ariaLabel }: Props = $props();

	let open = $state(false);
	let container: HTMLDivElement | undefined = $state();
	let trigger: HTMLButtonElement | undefined = $state();

	let selectedLabel = $derived(options.find((opt) => opt.value === value)?.label ?? '');

	function toggle() {
		open = !open;
	}

	function select(newValue: T) {
		const changed = value !== newValue;
		value = newValue;
		open = false;
		if (changed) {
			onchange?.();
		}
	}

	function handleWindowClick(event: MouseEvent) {
		if (open && container && !container.contains(event.target as Node)) {
			open = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			open = false;
			trigger?.focus();
		}
	}
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div bind:this={container} class="relative inline-block">
	<button
		bind:this={trigger}
		type="button"
		onclick={toggle}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label={ariaLabel}
		class="flex cursor-pointer items-center justify-between gap-2 rounded border border-blue-300 bg-white px-3 py-1.5 text-left hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
	>
		<span>{selectedLabel}</span>
		<i class="fa-solid fa-chevron-down text-xs text-gray-500 transition-transform {open ? 'rotate-180' : ''}"></i>
	</button>

	{#if open}
		<ul
			role="listbox"
			aria-label={ariaLabel}
			class="absolute left-0 z-10 mt-1 min-w-full rounded border border-blue-300 bg-white py-1 shadow-md"
		>
			{#each options as option (option.value)}
				<li role="none">
					<button
						type="button"
						role="option"
						aria-selected={option.value === value}
						onclick={() => select(option.value)}
						class="block w-full cursor-pointer px-3 py-1.5 text-left whitespace-nowrap hover:bg-blue-100 {option.value ===
						value
							? 'bg-blue-50 font-semibold text-blue-900'
							: ''}"
					>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
