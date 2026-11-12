<script lang="ts">
	import ContactCard from '$lib/ContactCard.svelte';
	interface Contact {
		name: string;
		role: string;
		email: string;
		homePhone?: string;
		mobilePhone?: string;
	}

	const members: Contact[] = [
		{
			name: 'John Simpson',
			role: 'Chair',
			email: 'simpsonshome@ntlworld.com',
			homePhone: '0151 3439052',
			mobilePhone: '07432535479'
		},
		{
			name: 'Kate Goldthorpe',
			role: 'Secretary',
			email: 'kmgoldthorpe@gmail.com',
			mobilePhone: '07598284987'
		},
		{
			name: 'Joan Lythgoe',
			role: 'Treasurer',
			email: 'joanlythgoe45@hotmail.com',
			homePhone: '01829 830977',
			mobilePhone: '07752722630'
		},
		{
			name: 'Manda Gillard',
			role: "Women's League Rep",
			email: 'mandagillard@hotmail.com',
			homePhone: '',
			mobilePhone: '07742939442'
		},
		{
			name: 'Pam Kloezeman',
			role: 'Mixed League Rep',
			email: 'pamkloezeman@yahoo.com',
			homePhone: '',
			mobilePhone: '07802296266'
		},
		{
			name: 'Tom Evans',
			role: "Men's League Rep",
			email: 'thomas.evansessex@btinternet.com',
			mobilePhone: '07765335018'
		},
		{
			name: 'Kate Buckeridge',
			role: 'TBC',
			email: 'katharinebuckeridge@hotmail.com',
			mobilePhone: '07855837997'
		},
		{
			name: 'Carmen Dowd',
			role: 'TBC',
			email: 'CarmenJLDowd@outlook.com',
			mobilePhone: '07879118767'
		}
	];
</script>

<div class="flex flex-wrap justify-center align-middle">
	{#each members as member}
		<ContactCard {...member} />
	{/each}
</div>
