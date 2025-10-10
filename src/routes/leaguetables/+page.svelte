<script lang="ts">
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';

	interface LeagueTable {
		headings: string[];
		rows: TeamRow[];
	}

	interface TeamRow {
		team: string;
		played: string;
		won: string;
		lost: string;
		sets_won: string;
		sets_lost: string;
		points: string;
		deductions: string;
	}

	let leagueType = $state('mens');
	let division = $state('1');
	let response: LeagueTable | null = $state(null);

	let loading = $state(false);

	/*let leagues = {
		mens: [1, 2, 3],
		ladies: [1, 2, 3],
		mixed: [1, 2, 3],
		vets: [1]
	};*/

	async function getLeagueTable() {
		loading = true;
		let url = `https://api.cadstl.com/${leagueType}/${division}`;
		let request = await fetch(url);
		response = await request.json();
		loading = false;
	}

	getLeagueTable();

	function getMobileHeadings(headings: string[]): string[] {
		return headings.map((v) => {
			let parts = v.split(' ');
			let firstLetters = parts.map((words) => words.substring(0, 1)).join('');
			return firstLetters;
		});
	}
</script>

<form>
	<select class="border border-blue-300" onchange={getLeagueTable} bind:value={leagueType}>
		<option value="mens">Mens</option>
		<option value="ladies">Ladies</option>
		<option value="mixed">Mixed</option>
		<option value="vets">Veterans</option>
	</select>
	<select class="border border-blue-300" onchange={getLeagueTable} bind:value={division}>
		<option value="1">League 1</option>
		<option value="2">League 2</option>
		<option value="3">League 3</option>
	</select>
</form>

<LoadingSpinner {loading} />
{#if response && !loading}
	<table class="mt-4">
		<thead>
			<tr>
				{#each getMobileHeadings(response.headings) as heading}
					<th class="table-cell border border-black bg-blue-900 p-2 font-bold text-white md:hidden"
						>{heading}</th
					>
				{/each}

				{#each response.headings as heading}
					<th class="hidden border border-black bg-blue-900 p-2 font-bold text-white md:table-cell"
						>{heading}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each response.rows as row, index}
				<tr class={index % 2 == 0 ? '' : 'bg-blue-100'}>
					{#each Object.values(row) as col}
						<td class="border border-black p-2">{col}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
