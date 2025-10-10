// Contact form field limits
export const CONTACT_FORM_LIMITS = {
	fromName: {
		maxLength: 100,
		required: true
	},
	fromEmail: {
		maxLength: 254, // RFC 5321 standard for email addresses
		required: true
	},
	emailSubject: {
		maxLength: 150,
		required: false
	},
	emailBody: {
		maxLength: 10000,
		required: true
	}
} as const;
