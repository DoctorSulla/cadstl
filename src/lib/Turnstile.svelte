<script module lang="ts">
	declare const turnstile: any;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let { successCallback, errorCallback } = $props();

	// Test
	//const siteKey = '1x00000000000000000000AA';
	// Prod
	const siteKey = '0x4AAAAAAB54ltaa360QwppJ';

	let turnstileContainer: HTMLElement;
	onMount(async () => {
		let check = document.getElementById('cloudflare-turnstile-script');
		if (!check) {
			const script = document.createElement('script');
			script.id = 'cloudflare-turnstile-script';
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
			script.async = true;
			script.defer = true;

			script.onload = () => {
				let options = {
					theme: 'light',
					sitekey: siteKey,
					callback: function (token: string) {
						successCallback(token);
					}
				};

				options['error-callback'] = function (error: string) {
					errorCallback(error);
				};

				turnstile.render(turnstileContainer, options);
			};
			document.head.appendChild(script);
		}
	});
</script>

<div id="turnstile-container" bind:this={turnstileContainer}></div>
