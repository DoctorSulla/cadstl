<script lang="ts">
	import GoogleMaps from '$lib/GoogleMaps.svelte';
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

<GoogleMaps />
