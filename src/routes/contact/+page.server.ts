import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { CONTACT_FORM_LIMITS } from '$lib/constants';

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case '&':
				return '&amp;';
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '"':
				return '&quot;';
			case "'":
				return '&#39;';
			default:
				return char;
		}
	});

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const containsLineBreak = (value: string) => /[\r\n]/.test(value);

export const actions = {
	default: async ({ request, platform }) => {

		const formData = await request.formData();

		const fromName = (formData.get('fromName') ?? '').toString().trim();
		const fromEmail = (formData.get('fromEmail') ?? '').toString().trim();
		const rawSubject = (formData.get('emailSubject') ?? '').toString().trim();
		const rawBody = (formData.get('emailBody') ?? '').toString().trim();

		const errors: Record<string, string> = {};

		if (!platform) {
			errors.platform = "Unexpected environment error";
			return fail(500, {
				success: false,
				errors,
				values: {
					fromName,
					fromEmail,
					emailSubject: rawSubject,
					emailBody: rawBody
				}
			});
		}


		const RESEND_API_KEY = platform.env.RESEND_API_KEY;

		const resend = new Resend(RESEND_API_KEY);

		if (!fromName) {
			errors.fromName = 'Please enter your name.';
		} else if (fromName.length > CONTACT_FORM_LIMITS.fromName.maxLength) {
			errors.fromName = `Name must be ${CONTACT_FORM_LIMITS.fromName.maxLength} characters or fewer.`;
		} else if (containsLineBreak(fromName)) {
			errors.fromName = 'Name cannot contain line breaks.';
		}

		if (!fromEmail) {
			errors.fromEmail = 'Please enter your email address.';
		} else if (!isValidEmail(fromEmail)) {
			errors.fromEmail = 'Please enter a valid email address.';
		} else if (containsLineBreak(fromEmail)) {
			errors.fromEmail = 'Email cannot contain line breaks.';
		}

		if (rawSubject.length > CONTACT_FORM_LIMITS.emailSubject.maxLength) {
			errors.emailSubject = `Subject must be ${CONTACT_FORM_LIMITS.emailSubject.maxLength} characters or fewer.`;
		} else if (containsLineBreak(rawSubject)) {
			errors.emailSubject = 'Subject cannot contain line breaks.';
		}

		if (!rawBody) {
			errors.emailBody = 'Please include a message.';
		} else if (rawBody.length > CONTACT_FORM_LIMITS.emailBody.maxLength) {
			errors.emailBody = `Message must be ${CONTACT_FORM_LIMITS.emailBody.maxLength.toLocaleString()} characters or fewer.`;
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				success: false,
				errors,
				values: {
					fromName,
					fromEmail,
					emailSubject: rawSubject,
					emailBody: rawBody
				}
			});
		}

		const escapedName = escapeHtml(fromName);
		const escapedEmail = escapeHtml(fromEmail);
		const subject = rawSubject || 'Website enquiry';
		const escapedSubject = escapeHtml(subject);
		const escapedBody = escapeHtml(rawBody);

		const html = `
			<h2>New contact form message</h2>
			<p><strong>From:</strong> ${escapedName} &lt;${escapedEmail}&gt;</p>
			<p><strong>Subject:</strong> ${escapedSubject}</p>
			<hr />
			<pre style="font-family: inherit; white-space: pre-wrap;">${escapedBody}</pre>
		`;

		try {
			const { error } = await resend.emails.send({
				from: `${escapedName} <contact-form@cadstl.com>`,
				to: ['matthew.halliday@gmail.com'],
				subject,
				html,
				text: `From: ${fromName} <${fromEmail}>
Subject: ${subject}

${rawBody}`
			});

			if (error) {
				return fail(500, {
					success: false,
					error: 'There was an issue sending your message, please try again later.',
					values: {
						fromName,
						fromEmail,
						emailSubject: rawSubject,
						emailBody: rawBody
					}
				});
			}

			return {
				success: true,
				message:
					'Thank you for your message. Someone will get back to you as soon as they are able.'
			};
		} catch (error) {
			return fail(500, {
				success: false,
				error: 'There was an issue sending your message, please try again later.',
				values: {
					fromName,
					fromEmail,
					emailSubject: rawSubject,
					emailBody: rawBody
				}
			});
		}
	}
};
