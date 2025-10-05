<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/state';

	let { children } = $props();

	const routes = {
		'/': 'Home',
		'/scorecards': 'Scorecards',
		'/rules': 'Rules',
		'/committee': 'Committee',
		'/photos': 'Photos',
		'/agmminutes': 'AGM Minutes',
		'/results': 'Results',
		'/previouswinners': 'Previous Winners',
		'/history': 'History'
	};

	let title: string = $derived.by(() => {
		let value = page.route.id ? routes[page.route.id] : 'CADSTL';
		return value;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="/fontawesome/css/fontawesome.min.css" rel="stylesheet" />
	<link href="/fontawesome/css/all.min.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Oswald:wght@200..700&display=swap"
		rel="stylesheet"
	/>
	<title>{title}</title>
</svelte:head>

<nav class="flex flex-wrap bg-blue-900 py-3">
	{#each Object.entries(routes) as [key, value]}
		<a class="oswald-regular mx-2 text-lg text-yellow-400 hover:underline" href={key}>{value}</a>
	{/each}
</nav>

<!-- <div class="m-auto my-4 w-fit rounded-2xl bg-red-400 p-4 text-red-900"> -->
<!-- 	This website is currently under construction. -->
<!-- </div> -->

<main class="m-auto max-w-6xl px-2">
	{#if page.route.id && page.route.id != '/'}
		<h1 class="mukta-regular mt-2 text-center text-3xl text-blue-500">{title}</h1>
	{/if}
	{@render children?.()}
</main>
