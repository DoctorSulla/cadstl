<script lang="ts">
	import GoogleMaps from '$lib/GoogleMaps.svelte';

	const clubs = [
		{ title: 'Chester Tennis Club', website: 'https://clubspark.lta.org.uk/ChesterLTC' },
		{ title: 'Wrexham Tennis Club', website: 'https://clubspark.lta.org.uk/WrexhamLawnTennisClub' },
		{ title: 'Glan Aber Tennis Club', website: 'https://www.glanaber.com/' },
		{ title: 'Hoole Tennis Club', website: 'https://clubspark.lta.org.uk/HooleLTC' },
		{ title: 'Heswall Tennis Club', website: 'https://clubspark.lta.org.uk/HeswallLawnTennisClub' },
		{ title: 'Tarvin Tennis Club', website: 'https://clubspark.lta.org.uk/TarvinTennisClub' },
		{
			title: 'Chesire Oaks Tennis Club',
			website: 'https://www.davidlloyd.co.uk/clubs/cheshire-oaks/club-facilities/tennis/'
		},
		{ title: 'Helsby Tennis Club', website: 'https://clubspark.lta.org.uk/HelsbyLTC' },
		{ title: 'Port Sunlight Tennis Club', website: 'https://clubspark.lta.org.uk/PortSunlightLTC' },
		{ title: 'Mold Tennis Club', website: 'https://clubspark.lta.org.uk/MoldLTC' },
		{ title: 'Hollies Tennis Club', website: 'https://clubspark.lta.org.uk/HolliesTennisClub' },
		{ title: 'Brymbo Tennis Club', website: 'https://clubspark.lta.org.uk/BrymboLTC' },
		{ title: 'Hoylake Tennis Club', website: 'https://www.hoylaketennisclub.co.uk/' },
		{
			title: 'Tattenhall Tennis Club',
			website: 'https://clubspark.lta.org.uk/tattenhalltennisclub'
		},
		{
			title: 'Neston Tennis Club',
			website: 'https://clubspark.lta.org.uk/NestonClub/Index/4329c5ed-a948-45d8-a963-39fbb309f25b'
		}
	];
</script>

<h1 class="mukta-regular m-auto mt-4 text-center text-4xl text-blue-600">
	Chester and District Summer Tennis League
</h1>

<p class="my-5 text-2xl">
	Welcome to the CADSTL website. As the name would suggest, we are a Chester based tennis league but
	have teams across the Wirral as well as a few in North Wales. If you are interested in joining the
	league please fill out a <a
		class="text-blue-700 underline hover:text-blue-900"
		href="/cadstl_registration_form_2025.doc">registration form <i class="fas fa-file-word"></i></a
	>.
</p>

<p class="my-5 text-2xl">
	This website has all the latest information concerning the 2025 season, including:
</p>
<ul class="mt-2 mb-10 list-disc text-xl">
	<li class="ml-4"><i class="fa-solid fa-calendar-days"></i> 2025 fixtures and teams</li>
	<li class="ml-4"><i class="fa-solid fa-medal"></i> The latest league tables</li>
	<li class="ml-4"><i class="fa-solid fa-scale-balanced"></i> The league rules</li>
	<li class="ml-4"><i class="fa-solid fa-memo"></i> AGM minutes</li>
	<li class="ml-4"><i class="fa-solid fa-address-card"></i> Committee contact details</li>
</ul>
<h1 class="text-2xl">Map of clubs competing in the league:</h1>
<GoogleMaps />

<ul class="mt-2 mb-10 hidden list-disc text-xl">
	{#each clubs as club}
		<li class="ml-4"><a class="text-blue-700 underline" href={club.website}>{club.title}</a></li>
	{/each}
</ul>
