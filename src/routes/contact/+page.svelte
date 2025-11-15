<script lang="ts">
	import { enhance } from '$app/forms';
	import { CONTACT_FORM_LIMITS } from '$lib/constants';
	import Turnstile from '$lib/Turnstile.svelte';

	type FieldNames =
		| 'fromName'
		| 'fromEmail'
		| 'emailSubject'
		| 'emailBody'
		| 'turnstileValidationError';
	type FormErrors = Partial<Record<FieldNames, string>>;
	type FormValues = Partial<
		Record<'fromName' | 'fromEmail' | 'emailSubject' | 'emailBody', string>
	>;
	type FormState = {
		success?: boolean;
		message?: string;
		error?: string;
		errors?: FormErrors;
		values?: FormValues;
	};

	export let form: FormState | undefined;

	let errors: FormErrors = form?.errors ?? {};
	let values: FormValues = form?.values ?? {};
	let successMessage: string | null = form?.success ? (form.message ?? null) : null;
	let errorMessage: string | null = form?.success === false ? (form.error ?? null) : null;
	let cfToken = '';
	let formDisabled = true;

	$: errors = form?.errors ?? {};
	$: values = form?.values ?? {};
	$: successMessage = form?.success ? (form.message ?? null) : null;
	$: errorMessage = form?.success === false ? (form.error ?? null) : null;
	$: if (form?.success) {
		cfToken = '';
		formDisabled = true;
	}

	function handleCloudflareToken(token: string) {
		cfToken = token;
		formDisabled = false;
	}

	function handleCloudflareTokenError(error: string) {
		errorMessage = 'You failed the Cloudflare Turnstile check. Please refresh and try again';
		formDisabled = true;
	}
</script>

<div class="mx-auto max-w-2xl p-6">
	{#if successMessage}
		<p class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-green-700">
			{successMessage}
		</p>
	{:else if errorMessage}
		<p class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
			{errorMessage}
		</p>
	{/if}

	{#if errors.turnstileValidationError}
		<p class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
			{errors.turnstileValidationError}
		</p>
	{:else if Object.keys(errors).length > 0 && !errorMessage}
		<p class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
			Please correct the errors below and try again.
		</p>
	{/if}

	<form method="post" use:enhance class="space-y-6 rounded-lg bg-white p-8 shadow-lg">
		<div>
			<label for="fromName" class="mukta-regular mb-2 block text-sm font-medium text-gray-700"
				>Your Name</label
			>
			<input
				placeholder="Your name"
				type="text"
				name="fromName"
				id="fromName"
				autocomplete="name"
				required
				maxlength={CONTACT_FORM_LIMITS.fromName.maxLength}
				value={values.fromName ?? ''}
				class={`mukta-regular w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 ${errors.fromName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
			/>
			{#if errors.fromName}
				<p class="mt-2 text-sm text-red-600">{errors.fromName}</p>
			{/if}
		</div>

		<div>
			<label for="fromEmail" class="mukta-regular mb-2 block text-sm font-medium text-gray-700"
				>Your Email</label
			>
			<input
				placeholder="Your email"
				type="email"
				name="fromEmail"
				id="fromEmail"
				autocomplete="email"
				required
				maxlength={CONTACT_FORM_LIMITS.fromEmail.maxLength}
				value={values.fromEmail ?? ''}
				class={`mukta-regular w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 ${errors.fromEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
			/>
			{#if errors.fromEmail}
				<p class="mt-2 text-sm text-red-600">{errors.fromEmail}</p>
			{/if}
		</div>

		<div>
			<label for="emailSubject" class="mukta-regular mb-2 block text-sm font-medium text-gray-700"
				>Subject</label
			>
			<input
				placeholder="Subject (optional)"
				type="text"
				name="emailSubject"
				id="emailSubject"
				autocomplete="off"
				maxlength={CONTACT_FORM_LIMITS.emailSubject.maxLength}
				value={values.emailSubject ?? ''}
				class={`mukta-regular w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 ${errors.emailSubject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
			/>
			{#if errors.emailSubject}
				<p class="mt-2 text-sm text-red-600">{errors.emailSubject}</p>
			{/if}
		</div>

		<div>
			<label for="emailBody" class="mukta-regular mb-2 block text-sm font-medium text-gray-700"
				>Your Message</label
			>
			<textarea
				name="emailBody"
				id="emailBody"
				rows="6"
				placeholder="Please type your message here..."
				maxlength={CONTACT_FORM_LIMITS.emailBody.maxLength}
				class={`resize-vertical mukta-regular w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 ${errors.emailBody ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
				>{values.emailBody ?? ''}</textarea
			>
			{#if errors.emailBody}
				<p class="mt-2 text-sm text-red-600">{errors.emailBody}</p>
			{/if}
		</div>
		<input type="hidden" name="cf-turnstile-token" value={cfToken} />

		<button
			type="submit"
			class="oswald-regular w-full transform rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-200"
			disabled={formDisabled}
		>
			Send Enquiry
		</button>

		<Turnstile successCallback={handleCloudflareToken} errorCallback={handleCloudflareTokenError} />
	</form>
</div>
