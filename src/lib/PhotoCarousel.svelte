<script lang="ts">
	let { photos = [] } = $props();

	let currentPhoto = $state(0);
	let numberOfPhotos = $derived(photos.length);

	function increment() {
		if (currentPhoto + 1 < numberOfPhotos) {
			console.log(currentPhoto);
			currentPhoto++;
		} else {
			currentPhoto = 0;
		}
	}

	function decrement() {
		if (currentPhoto > 0) {
			currentPhoto--;
		} else {
			currentPhoto = numberOfPhotos - 1;
		}
	}
</script>

<div class="m-auto text-center">
	<img class="m-auto" alt={photos[currentPhoto].caption} src={photos[currentPhoto].src} />
	<p class="mb-3 text-center">
		{photos[currentPhoto].caption}
	</p>

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
