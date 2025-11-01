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

	interface Division {
		id: number;
		name: string;
	}

	interface Divisions {
		mens: Division[];
		ladies: Division[];
		mixed: Division[];
		vets: Division[];
	}

	let divisions: Divisions = {
		mens: [
			{ id: 1, name: 'Division 1' },
			{ id: 2, name: 'Division 2' },
			{ id: 3, name: 'Division 3' }
		],
		ladies: [
			{ id: 1, name: 'Division 1' },
			{ id: 2, name: 'Division 2' },
			{ id: 3, name: 'Division 3' }
		],
		mixed: [
			{ id: 1, name: 'Division 1' },
			{ id: 2, name: 'Division 2' },
			{ id: 3, name: 'Division 3' }
		],
		vets: [{ id: 1, name: 'Division 1' }]
	};

	let leagueType = $state('mens');
	let division = $state(1);
	let availableDivisions = $derived(divisions[leagueType]);
	let response: LeagueTable | null = $state(null);

	let loading = $state(true);

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

<p class="my-2">
	Below are the league tables for the current season. Our full fixtures and league tables can be
	found at <a
		class="text-blue-500 underline"
		href="https://bowlsresults.co.uk/resultstennis/chestertennis/index.php">Bowls Results</a
	>.
</p>
<form>
	<select class="border border-blue-300" onchange={getLeagueTable} bind:value={leagueType}>
		<option value="mens">Mens</option>
		<option value="ladies">Ladies</option>
		<option value="mixed">Mixed</option>
		<option value="vets">Veterans</option>
	</select>
	<select class="border border-blue-300" onchange={getLeagueTable} bind:value={division}>
		{#each availableDivisions as div}
			<option value={div.id}>{div.name}</option>
		{/each}
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
