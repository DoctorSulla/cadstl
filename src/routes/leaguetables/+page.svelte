<script lang="ts">
	import Dropdown from '$lib/Dropdown.svelte';
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
			{ id: 3, name: 'Division 3' },
			{ id: 4, name: 'Division 4' }
		],
		mixed: [
			{ id: 1, name: 'Division 1' },
			{ id: 2, name: 'Division 2' },
			{ id: 3, name: 'Division 3' }
		],
		vets: [{ id: 1, name: 'Division 1' }]
	};

	const leagueOptions: { value: keyof Divisions; label: string }[] = [
		{ value: 'mens', label: 'Mens' },
		{ value: 'ladies', label: 'Womens' },
		{ value: 'mixed', label: 'Mixed' },
		{ value: 'vets', label: 'Veterans' }
	];

	let leagueType: keyof Divisions = $state('mens');
	let division = $state(1);
	let availableDivisions = $derived(divisions[leagueType]);
	let divisionOptions = $derived(
		availableDivisions.map((div) => ({ value: div.id, label: div.name }))
	);
	let response: LeagueTable | null = $state(null);

	let loading = $state(true);

	async function getLeagueTable() {
		loading = true;
		let url = `https://api.cadstl.com/${leagueType}/${division}`;
		let request = await fetch(url);
		response = await request.json();
		loading = false;
	}

	function handleLeagueTypeChange() {
		if (!availableDivisions.some((d) => d.id === division)) {
			division = availableDivisions[0].id;
		}
		getLeagueTable();
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
<form class="flex flex-wrap gap-2">
	<Dropdown
		options={leagueOptions}
		bind:value={leagueType}
		onchange={handleLeagueTypeChange}
		ariaLabel="League type"
	/>
	<Dropdown
		options={divisionOptions}
		bind:value={division}
		onchange={getLeagueTable}
		ariaLabel="Division"
	/>
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
