<script lang="ts">
	import { fade } from 'svelte/transition';
	let { photos = [], autoPlay = true } = $props();

	let autoPlayInterval: number | undefined = setAutoPlay();

	let currentPhoto = $state(0);
	let numberOfPhotos = $derived(photos.length);
	let visible = $state(true);

	function increment() {
		resetAutoPlay();
		if (currentPhoto + 1 < numberOfPhotos) {
			visible = false;
			currentPhoto++;
		} else {
			currentPhoto = 0;
		}
	}

	function decrement() {
		resetAutoPlay();
		if (currentPhoto > 0) {
			visible = false;
			currentPhoto--;
		} else {
			currentPhoto = numberOfPhotos - 1;
		}
	}

	function show() {
		visible = true;
	}

	function setAutoPlay() {
		if (autoPlay) {
			let interval = setInterval(increment, 8000);
			return interval;
		} else return;
	}

	function resetAutoPlay() {
		if (autoPlay) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = setAutoPlay();
		}
	}
</script>

<div class="m-auto text-center">
	{#if visible}
		<div
			transition:fade={{ duration: 1000 }}
			onoutroend={() => {
				show();
			}}
		>
			<img class="m-auto" alt={photos[currentPhoto].caption} src={photos[currentPhoto].src} />
			<p class="mb-3 text-center">
				{photos[currentPhoto].caption}
			</p>
		</div>
	{/if}

	<div class="flex justify-center align-middle text-xl">
		<button class="mr-2 cursor-pointer text-blue-500" type="button" onclick={decrement}
			><i class="fa-solid fa-arrow-left"></i> Previous</button
		>
		<span>Photo {currentPhoto + 1} of {numberOfPhotos}</span>
		<button class="ml-2 cursor-pointer text-blue-500" type="button" onclick={increment}
			>Next <i class="fa-solid fa-arrow-right"></i></button
		>
	</div>
</div>
