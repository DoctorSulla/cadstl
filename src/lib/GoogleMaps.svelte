<script module lang="ts">
	declare const google: any;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let googleMapsWrapper: HTMLElement;

	const locations = [
		{ title: 'Chester Tennis Club', position: { lat: 53.1757, lng: -2.8956 } },
		{ title: 'Wrexham Tennis Club', position: { lat: 53.056, lng: -3.0044 } },
		{ title: 'Glan Aber Tennis Club', position: { lat: 53.1786, lng: -2.9057 } },
		{ title: 'Hoole Tennis Club', position: { lat: 53.2242, lng: -2.8352 } },
		{ title: 'Heswall Tennis Club', position: { lat: 53.3357, lng: -3.1051 } },
		{ title: 'Tarvin Tennis Club', position: { lat: 53.1984, lng: -2.77 } },
		{ title: 'Chesire Oaks Tennis Club', position: { lat: 53.2658, lng: -2.8919 } },
		{ title: 'Helsby Tennis Club', position: { lat: 53.2671, lng: -2.7778 } },
		{ title: 'Port Sunlight Tennis Club', position: { lat: 53.3281, lng: -2.9665 } },
		{ title: 'Mold Tennis Club', position: { lat: 53.1674, lng: -3.14576 } },
		{ title: 'Hollies Tennis Club', position: { lat: 52.9735, lng: -2.6892 } },
		{ title: 'Brymbo Tennis Club', position: { lat: 53.0642, lng: -3.0473 } },
		{ title: 'Hoylake Tennis Club', position: { lat: 53.3826, lng: -3.1843 } },
		{ title: 'Tattenhall Tennis Club', position: { lat: 53.1249, lng: -2.7653 } },
		{ title: 'Neston Tennis Club', position: { lat: 53.2969, lng: -3.0757 } }
	];

	function generateCadstlMap() {
		const map = new google.maps.Map(googleMapsWrapper, {
			mapId: '7cb7e0c11d7a014c439a8126',
			center: { lat: 53.1934, lng: -2.8943 },
			zoom: 9
		});

		for (let location of locations) {
			new google.maps.marker.AdvancedMarkerElement({
				map,
				position: location.position,
				title: location.title
			});
		}
	}

	onMount(async () => {
		let check = document.getElementById('google-maps-script');
		if (!check) {
			const script = document.createElement('script');
			script.id = 'google-maps-script';
			script.src =
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkoWsxb0Jk1YjDvhz0v9zLevAADKEkZU8&libraries=maps,marker';
			script.async = true;
			script.defer = true;

			script.onload = () => {
				generateCadstlMap();
			};
			document.head.appendChild(script);
		} else {
			generateCadstlMap();
		}
	});
</script>

<div class="h-96 w-full" bind:this={googleMapsWrapper}></div>
