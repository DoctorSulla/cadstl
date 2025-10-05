<script lang="ts">
	let { name, role, email, homePhone, mobilePhone } = $props();
</script>

<div class="m-3 h-44 w-80 rounded-2xl border border-gray-300 p-2 shadow-lg shadow-blue-300">
	<div class="text-center text-xl font-bold">{role} - {name} <i class="fa-solid fa-user"></i></div>

	{#if email}
		<div class="py-1"><i class="fa-solid fa-envelope text-blue-500"></i> {email}</div>
	{/if}

	{#if homePhone}
		<div class="py-1"><i class="fa-solid fa-phone text-green-500"></i> {homePhone}</div>
	{/if}
	{#if mobilePhone}
		<div class="py-1"><i class="fa-solid fa-mobile text-purple-500"></i> {mobilePhone}</div>
	{/if}
</div>
