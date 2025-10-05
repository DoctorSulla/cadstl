<script lang="ts">
	import ContactCard from '$lib/ContactCard.svelte';
	interface Contact {
		name: string;
		role: string;
		email: string;
		homePhone: string;
		mobilePhone: string;
	}

	const members: Contact[] = [
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'John Simpson',
			role: 'Chairman',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '01513439052',
			mobilePhone: '07432535479'
		}
	];
</script>

<div class="flex flex-wrap justify-center align-middle">
	{#each members as member}
		<ContactCard {...member} />
	{/each}
</div>
