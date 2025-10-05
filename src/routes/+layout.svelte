<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();

	const routes = {
		'/': 'Home',
		'/history': 'History',
		'/rules': 'Rules',
		'/photos': 'Photos',
		'/results': 'Results',
		'/committee': 'Committee',
		'/scorecards': 'Scorecards'
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#each Object.entries(routes) as [key, value]}
	<a class="mx-1 hover:underline" href={key}>{value}</a>
{/each}

{@render children?.()}
