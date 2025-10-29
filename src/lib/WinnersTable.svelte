<script lang="ts">
	import { winnersData, type WinnerEntry } from './winnersData';

	type CategoryType = 'ladies' | 'mixed' | 'mens';

	let selectedCategory: CategoryType = 'ladies';
	let sectionRefs: Record<string, HTMLElement> = {};

	$: sortedWinners = [...winnersData[selectedCategory]].sort((a, b) => b.year - a.year);

	$: groupedByDivision = sortedWinners.reduce(
		(acc, entry) => {
			if (!acc[entry.division]) {
				acc[entry.division] = [];
			}
			acc[entry.division].push(entry);
			return acc;
		},
		{} as Record<string, WinnerEntry[]>
	);

	$: divisionOrder = Object.keys(groupedByDivision).sort();

	function scrollToDivision(division: string) {
		const element = sectionRefs[division];
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<div class="space-y-6">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex items-center gap-4">
			<label for="category-select" class="text-lg font-semibold">Select Category:</label>
			<select
				id="category-select"
				bind:value={selectedCategory}
				class="rounded border border-gray-300 bg-white px-4 py-2 text-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
			>
				<option value="ladies">Ladies</option>
				<option value="mixed">Mixed</option>
				<option value="mens">Mens</option>
			</select>
		</div>
	</div>

	{#if divisionOrder.length > 0}
		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-semibold text-gray-700">Jump to Division:</p>
			<div class="flex flex-wrap gap-2">
				{#each divisionOrder as division (division)}
					<button
						on:click={() => scrollToDivision(division)}
						class="rounded-md bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						{division}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="space-y-8">
		{#each divisionOrder as division (division)}
			<div class="overflow-x-auto" bind:this={sectionRefs[division]}>
				<h3 class="mb-3 text-xl font-bold text-gray-800">{division}</h3>
				<table class="w-full border-collapse border border-gray-300">
					<thead>
						<tr class="bg-gray-100">
							<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Year</th>
							<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Winner</th>
						</tr>
					</thead>
					<tbody>
						{#each groupedByDivision[division] as entry, index (entry.year)}
							<tr
								class={index % 2 === 0
									? 'bg-white hover:bg-blue-50'
									: 'bg-gray-50 hover:bg-blue-50'}
							>
								<td class="border border-gray-300 px-4 py-2 font-medium">{entry.year}</td>
								<td class="border border-gray-300 px-4 py-2">{entry.winner}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>
</div>

<style>
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}
</style>
