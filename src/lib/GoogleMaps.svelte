<script context="module" lang="ts">
	declare const google: any;

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
		{ title: 'Hoylake Tennis Club', position: { lat: 53.3826, lng: -3.1843 } }
	];
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let googleMapsWrapper: HTMLElement;

	onMount(async () => {
		const script = document.createElement('script');
		script.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkoWsxb0Jk1YjDvhz0v9zLevAADKEkZU8&libraries=maps,marker';
		script.async = true;
		script.defer = true;
		script.onload = () => {
			const map = new google.maps.Map(googleMapsWrapper, {
				mapId: '7cb7e0c11d7a014c439a8126',
				center: { lat: 53.1934, lng: -2.8943 },
				zoom: 9
			});

			for (let location of locations) {
				/*let dot = document.createElement('div');
				dot.style.width = '15px';
				dot.style.height = '15px';
				dot.style.backgroundColor = 'red';
				dot.style.borderRadius = '100%';
				dot.style.border = '1px solid black';
				let label = document.createElement('div');
				label.style.textAlign = 'center';
				label.style.fontWeight = 'bold';
				label.appendChild(dot);
				label.innerHTML += location.title; */

				new google.maps.marker.AdvancedMarkerElement({
					map,
					position: location.position,
					title: location.title
				});
			}
		};
		document.head.appendChild(script);
	});
</script>

<div class="h-96 w-full" bind:this={googleMapsWrapper}></div>
