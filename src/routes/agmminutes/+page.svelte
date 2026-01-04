<p class="mt-2">
	Below are the provisional minutes for the 2025 AGM. (To be confirmed at the 2026 AGM)
</p>
<div class="mt-6 flex justify-evenly">
	<a href="/agm_minutes/agm_minutes_2025.pdf">
		<div class="text-center">
			<i class="fa-solid fa-file-pdf text-6xl text-red-500"></i>
			<br />
			2025 AGM Minutes
		</div>
	</a>
</div>

<p class="mt-8 mb-4 text-lg font-semibold">Historic AGM Minutes</p>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016] as year}
		<a
			href="/agm_minutes/agm_minutes_{year}.pdf"
			class="group flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-red-300 hover:shadow-md"
		>
			<i
				class="fa-solid fa-file-pdf text-5xl text-red-500 transition-transform group-hover:scale-110"
			></i>
			<span class="mt-2 text-sm font-medium text-gray-700 group-hover:text-red-600">{year}</span>
		</a>
	{/each}
</div>
