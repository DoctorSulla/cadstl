<script lang="ts">
	import PhotoCarousel from '$lib/PhotoCarousel.svelte';

	let photos = [
		{ src: '/photos/2024/ladiesd1.avif', caption: "Ladies' division 1 - Wrexham" },
		{ src: '/photos/2024/ladiesd2.avif', caption: "Ladies' division 2 - Chester A" },
		{ src: '/photos/2024/ladiesd3.avif', caption: "Ladies' division 3 - Malpas" },
		{ src: '/photos/2024/mensd3.avif', caption: "Men's division 3 - Cheshire Oaks" },
		{ src: '/photos/2024/mixedd2.avif', caption: 'Mixed division 2 - Cheshire Oaks A' },
		{ src: '/photos/2024/mixedd3.avif', caption: 'Mixed division 3 - Hooton' },
		{ src: '/photos/2024/vets.avif', caption: "Veteran's division - Heswall" }
	];
</script>

<svelte:head>
	{#each photos as photo}
		<link rel="preload" as="image" href={photo.src} />
	{/each}
</svelte:head>

<div class="mt-2">
	<PhotoCarousel {photos} />
</div>
