<script lang="ts">
	import PhotoCarousel from '$lib/PhotoCarousel.svelte';

	let photos = [
		{ src: '/photos/2025/GlanAberB-Mens-division3.jpg', caption: "Men's Division 3 - Glan Aber" },
		{ src: '/photos/2025/Heswall-mixed-division3.jpg', caption: 'Mixed Division 3 - Heswall' },
		{ src: '/photos/2025/HolliesB-mens-division2.jpg', caption: "Men's Division 2 - Hollies" },
		{ src: '/photos/2025/Tarvin-Ladies-division3.jpg', caption: 'Ladies Division 3 - Tarvin' },
		{ src: '/photos/2025/Wrexham-Ladies-division1.jpg', caption: 'Ladies Division 1 - Wrexham' }
	];
</script>

<svelte:head>
	{#each photos as photo}
		<link rel="preload" as="image" href={photo.src} />
	{/each}
</svelte:head>
<p class="mb-3">Below are some photos from the 2025 AGM:</p>
<div class="mt-2">
	<PhotoCarousel {photos} />
</div>
