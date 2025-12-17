type IncidentFormLike = {
    date: string;
    time?: string;
    location?: string;
    parties?: string;
    narrative: string;
};

const MAX_FIELD_LENGTH = 2000;

const sanitize = (value: string | undefined) =>
    (value ?? '').trim().slice(0, MAX_FIELD_LENGTH);

export function buildIncidentPrompt(input: IncidentFormLike) {
    return `
Date: ${sanitize(input.date)}${input.time ? ` ${sanitize(input.time)}` : ''}
Location: ${sanitize(input.location)}
Parties: ${sanitize(input.parties)}

Incident narrative:
${sanitize(input.narrative)}
    `.trim();
}
