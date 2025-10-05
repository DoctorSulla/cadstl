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
		'/results': 'Results',
		'/previouswinners': 'Previous Winners',
		'/history': 'History'
	};

	let title = $derived.by(() => {
		let value = page.route.id ? routes[page.route.id] : 'Default';
		return value;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="/fontawesome/css/fontawesome.min.css" rel="stylesheet" />
	<link href="/fontawesome/css/all.min.css" rel="stylesheet" />
	<title>{title}</title>
</svelte:head>

<nav class="bg-blue-900 py-3">
	{#each Object.entries(routes) as [key, value]}
		<a class="mx-2 text-yellow-400 hover:underline" href={key}>{value}</a>
	{/each}
</nav>

<!-- <div class="m-auto my-4 w-fit rounded-2xl bg-red-400 p-4 text-red-900"> -->
<!-- 	This website is currently under construction. -->
<!-- </div> -->

<main class="m-auto max-w-5xl px-2">
	{#if page.route.id && page.route.id != '/'}
		<h1 class="mt-2 text-center text-3xl text-blue-500">{title}</h1>
	{/if}
	{@render children?.()}
</main>
