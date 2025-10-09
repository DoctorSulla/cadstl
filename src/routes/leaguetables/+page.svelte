<script>
	let leagueType = $state('mens');
	let division = $state('1');
	let response = $state(null);

	async function getLeagueTable() {
		let url = `https://api.cadstl.com/${leagueType}/${division}`;
		let request = await fetch(url);
		response = await request.json();
	}

	getLeagueTable();
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

{#if response}
	<table class="mt-4">
		<thead>
			<tr>
				{#each response.headings as heading}
					<th class="border border-black bg-gray-300 p-2 font-bold">{heading}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each response.rows as row}
				<tr>
					{#each Object.values(row) as col}
						<td class="border border-black p-2">{col}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
