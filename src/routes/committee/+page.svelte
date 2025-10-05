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
			homePhone: '0151 3439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'Kate Goldthorpe',
			role: 'Secretary',
			email: 'kmgoldthorpe@gmail.com',
			homePhone: '01244 336479',
			mobilePhone: '07598284987'
		},
		{
			name: 'Joan Lythgoe',
			role: 'Treasurer',
			email: 'joanlythgoe45@hotmail.com',
			homePhone: '01829 803977',
			mobilePhone: '07752722630'
		},
		{
			name: 'Sue Long',
			role: 'Ladies League Rep',
			email: 'suelong@hotmail.co.uk',
			homePhone: '',
			mobilePhone: '07846698264'
		},
		{
			name: 'Pam Kloezeman',
			role: 'Mixed League Rep',
			email: 'pamkloezeman@gmail.com',
			homePhone: '',
			mobilePhone: '07802296266'
		},
		{
			name: 'Alan Hewitt',
			role: 'Mens League Rep',
			email: 'eah6644@yahoo.com',
			mobilePhone: ''
		}
	];
</script>

<div class="flex flex-wrap justify-center align-middle">
	{#each members as member}
		<ContactCard {...member} />
	{/each}
</div>
