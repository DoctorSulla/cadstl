<script lang="ts">
	import PhotoCarousel from '$lib/PhotoCarousel.svelte';

	let photos = [
		{
			src: '/photos/2026/Mens%20Division%201%20Hoylake.jpg',
			caption: "Men's Division 1 - Hoylake"
		},
		{
			src: '/photos/2026/Mixed%20Division%201%20Wrexham.jpg',
			caption: 'Mixed Division 1 - Wrexham'
		},
		{
			src: '/photos/2026/Womens%20Division%201%20Wrexham.jpg',
			caption: "Women's Division 1 - Wrexham"
		},
		{
			src: '/photos/2026/Womens%20Division%203%20Thornton%20Hough.jpg',
			caption: "Women's Division 3 - Thornton Hough"
		},
		{ src: '/photos/2026/Mens%20Vets%20Wrexham.jpg', caption: "Men's Vets - Wrexham" }
	];
</script>

<svelte:head>
	{#each photos as photo}
		<link rel="preload" as="image" href={photo.src} />
	{/each}
</svelte:head>
<p class="mb-3">
	Below are some photos from 2026. You can see the 2025 photos <a
		class="text-blue-500 hover:underline"
		href="/photos/2025">here.</a
	>
	and the 2024 photos <a class="text-blue-500 hover:underline" href="/photos/2024">here.</a>
</p>
<div class="mt-2">
	<PhotoCarousel {photos} />
</div>
