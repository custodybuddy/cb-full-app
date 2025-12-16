
const pad = (value: number) => value.toString().padStart(2, '0');

const getLocalDateParts = () => {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth(), // zero-based for Date APIs
        day: now.getDate()
    };
};

/**
 * Formats the current date into a human-readable string using local time.
 * e.g., "September 1, 2024"
 */
export const getFormattedDate = (): string => {
    const { year, month, day } = getLocalDateParts();
    // Construct a Date with explicit Y/M/D to avoid timezone-related day shifts
    const localDate = new Date(year, month, day);
    return localDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Gets the current date in YYYY-MM-DD format using local date components
 * to avoid UTC offset shifting the day.
 */
export const getISODate = (): string => {
    const { year, month, day } = getLocalDateParts();
    return `${year}-${pad(month + 1)}-${pad(day)}`;
};
