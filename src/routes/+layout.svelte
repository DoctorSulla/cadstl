<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';

	let { children } = $props();

	const routes = {
		'/': 'Home',
		'/scorecards': 'Scorecards',
		'/rules': 'Rules',
		'/committee': 'Committee',
		'/photos': 'Photos',
		'/agmminutes': 'AGM Minutes',
		'/leaguetables': 'League Tables',
		'/previouswinners': 'Previous Winners',
		'/contact': 'Contact Us',
		'/history': 'History'
	};

	let title: string = $derived.by(() => {
		let value = page.route.id ? routes[page.route.id] : 'CADSTL';
		return value;
	});

	let expanded = $state(false);

	function toggle() {
		expanded = !expanded;
	}

	beforeNavigate(() => (expanded = false));
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

<nav class="bg-blue-900 py-4">
	<button class="md:hidden" onclick={toggle} aria-label="Toggle menu">
		<i class="fa-solid fa-bars mx-2 cursor-pointer text-4xl text-yellow-400"></i>
	</button>
	<div
		class="{expanded
			? 'flex flex-col'
			: 'hidden flex-col'} flex-wrap bg-blue-900 md:flex md:flex-row"
	>
		{#each Object.entries(routes) as [key, value]}
			<a
				class="oswald-regular my-2 text-xl text-yellow-400 hover:underline md:mx-2 md:my-0"
				href={key}>{value}</a
			>
		{/each}
	</div>
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
