<script lang="ts">
	let { name, role, email = '', homePhone = '', mobilePhone = '' } = $props();
</script>

<div class="m-3 h-44 w-lg rounded-2xl border border-gray-300 p-2 shadow-lg shadow-blue-300">
	<div class="text-center text-xl font-bold">{role} - {name} <i class="fa-solid fa-user"></i></div>

	{#if email}
		<div class="py-1">
			<i class="fa-solid fa-envelope text-blue-500"></i>
			<a class="ml-1" href="mailto:{email}">{email}</a>
		</div>
	{/if}

	{#if homePhone}
		<div class="py-1">
			<i class="fa-solid fa-phone text-green-500"></i>
			<a class="ml-1" href="tel:{homePhone}">{homePhone}</a>
		</div>
	{/if}
	{#if mobilePhone}
		<div class="py-1">
			<i class="fa-solid fa-mobile text-purple-500"></i>
			<a class="ml-1" href="tel:{mobilePhone}">{mobilePhone}</a>
		</div>
	{/if}
</div>
