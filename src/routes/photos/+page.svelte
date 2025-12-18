<script lang="ts">
	import PhotoCarousel from '$lib/PhotoCarousel.svelte';

	let photos = [
		{ src: '/photos/2025/GlanAberB-Mens-division3.jpg', caption: "Men's Division 3 - Glan Aber" },
		{ src: '/photos/2025/Heswall-mixed-division3.jpg', caption: 'Mixed Division 3 - Heswall' },
		{ src: '/photos/2025/HolliesB-mens-division2.jpg', caption: "Men's Division 2 - Hollies" },
		{ src: '/photos/2025/Tarvin-Ladies-division3.jpg', caption: 'Ladies Division 3 - Tarvin' },
		{ src: '/photos/2025/Wrexham-Ladies-division1.jpg', caption: 'Ladies Division 1 - Wrexham' },
		{ src: '/photos/2025/Heswall-Mens-Vets.jpg', caption: "Vet's Division - Heswall" }
	];
</script>

<svelte:head>
	{#each photos as photo}
		<link rel="preload" as="image" href={photo.src} />
	{/each}
</svelte:head>
<p class="mb-3">
	Below are some photos from the 2025 AGM. You can see the 2024 photos <a
		class="text-blue-500 hover:underline"
		href="/photos/2024">here.</a
	>
</p>
<div class="mt-2">
	<PhotoCarousel {photos} />
</div>
