<script>
	let { loading = false } = $props();
</script>

{#if loading}
	<i class="fa-regular fa-loader my-3 text-3xl text-yellow-400"></i>
{/if}

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	i {
		animation: spin 2s linear infinite;
	}
</style>
