export function isAllowedEmail(email) {
  const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN; // "uwo.ca"
  const emailDomain = email.split('@')[1];
  return emailDomain === allowedDomain;
}
