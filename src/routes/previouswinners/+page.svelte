<script>
	import WinnersTable from '$lib/WinnersTable.svelte';
</script>

<div class="space-y-8">
	<div>
		<h1 class="mb-4 text-3xl font-bold">Previous League Winners</h1>
		<p class="text-gray-600">
			Select a category to view all division winners throughout the league history.
		</p>
	</div>

	<WinnersTable />

	<div class="mt-12 border-t pt-8">
		<p class="mb-4 text-sm text-gray-600">
			For more details, you can also download the original PDF:
		</p>
		<a
			href="/winners-all.pdf"
			class="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
		>
			<i class="fa-solid fa-file-pdf"></i>
			Download Full PDF
		</a>
	</div>
</div>
