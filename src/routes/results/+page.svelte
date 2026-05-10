<script lang="ts">
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';

	interface Result {
		home_team: string;
		home_team_points: number;
		away_team_points: number;
		away_team: string;
		date: string;
		time: string;
		division: string;
		completed: boolean;
	}

	interface Leagues {
		mens: Result[] | null;
		womens: Result[] | null;
		mixed: Result[] | null;
		vets: Result[] | null;
	}

	let loading = $state(true);
	let leagues: Leagues = $state({ mens: [], womens: [], mixed: [], vets: [] });

	let currentSelection = $state('mens');

	async function getWeeksResults() {
		loading = true;
		let url = `https://api.cadstl.com/resultsAndFixtures`;
		let request = await fetch(url);
		let response: Result[] = await request.json();
		response = response.filter((v: Result) => v.completed);
		leagues.mens = response.filter((v: Result) => v.division.match(/Mens/));
		leagues.womens = response.filter((v: Result) => v.division.match(/Womens/));
		leagues.mixed = response.filter((v: Result) => v.division.match(/Mixed/));
		leagues.vets = response.filter((v: Result) => v.division.match(/Vet/));

		loading = false;
	}

	getWeeksResults();
</script>

<p class="my-2">
	Below are the results for the current week. Please see <a
		class="text-blue-700 underline"
		href="https://www.bowlsresults.co.uk/resultstennis/chestertennis/index.php">bowlsresults</a
	> for the full list of fixtures and results.
</p>
<LoadingSpinner {loading} />
{#if !loading}
	<div class="mt-2">
		{#each Object.keys(leagues) as league}
			<button
				class={currentSelection === league
					? 'bg-blue-900; mx-0.5 mb-2 cursor-pointer rounded-xl border border-slate-600 bg-blue-900 p-2 text-yellow-400 capitalize'
					: 'mx-0.5 mb-2 cursor-pointer rounded-xl border border-slate-600 p-2 capitalize'}
				onclick={() => (currentSelection = league)}>{league}</button
			>
		{/each}
	</div>

	{#each Object.keys(leagues) as league}
		{#if currentSelection === league}
			{#if leagues[league] && leagues[league].length === 0}
				<div class="rounded-lg bg-blue-100 p-2 text-center text-blue-500">
					No <span class="capitalize">{league}</span> results yet for this week.
				</div>
			{/if}
			{#each leagues[league] as result}
				<div class="fit m-auto my-1 bg-slate-50 py-2">
					<div class="fit m-auto">
						<div class="flex justify-center">
							<div class="w-72 text-right">
								{result.home_team}
							</div>
							<div class="w-24 text-center">
								{result.home_team_points} <span class="text-amber-400">|</span>
								{result.away_team_points}
							</div>
							<div class="w-72 text-left">
								{result.away_team}
							</div>
						</div>
					</div>

					<div class="text-center text-xs">{result.division}</div>
				</div>
			{/each}
		{/if}
	{/each}
{/if}
<p class="my-2">
	Results must be entered by the home captain on the online system (<a
		class="text-blue-700 underline"
		href="https://www.bowlsresults.co.uk/resultstennis/chestertennis/index.php">link</a
	>) as soon as possible but within one week of the completion of the match.
</p>

<p class="my-2">
	Captains are encouraged to keep a record of each match and scorecards for each league format are
	provided below in excel format as well as a completed example.
</p>
<div class="mt-6 flex flex-wrap justify-evenly">
	<a href="/scorecards/example_completed_scorecard.pdf">
		<div class="text-center">
			<i class="fa-solid fa-file-pdf text-8xl text-red-500"></i>
			<br />
			Example Scorecard
		</div>
	</a>

	<a href="/scorecards/ladies_scorecard.xls">
		<div class="text-center">
			<i class="fa-solid fa-file-excel text-8xl text-green-500"></i>

			<br />
			Ladies Scorecard
		</div>
	</a>

	<a href="/scorecards/mixed_scorecard.xlsx">
		<div class="text-center">
			<i class="fa-solid fa-file-excel text-8xl text-green-500"></i>

			<br />
			Mixed Scorecard
		</div>
	</a>

	<a href="/scorecards/mens_scorecard.xls">
		<div class="text-center">
			<i class="fa-solid fa-file-excel text-8xl text-green-500"></i>

			<br />
			Mens Scorecard
		</div>
	</a>
</div>
