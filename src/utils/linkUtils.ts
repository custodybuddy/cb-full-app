/**
 * Converts plain-text URLs (with or without scheme) into clickable HTML anchor tags.
 * Handles common cases like trailing punctuation by trimming it off the link target.
 */
export const ensureAbsoluteUrl = (url: string): string => {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return `https://${url}`;
};

export const hyperlinkText = (text: string): string => {
    if (!text) return '';

    // Extract existing anchors to avoid double-wrapping and to normalize styling.
    const anchors: string[] = [];
    const placeholderText = text.replace(/<a\b[^>]*>.*?<\/a>/gis, (match) => {
        anchors.push(match);
        return `__ANCHOR_PLACEHOLDER_${anchors.length - 1}__`;
    });

    // Match http(s)://..., www..., or bare domains with TLD.
    const urlRegex = /((https?:\/\/|www\.)[^\s<>"')]+[^\s<>"'),.;!?:])|\b(?!https?:\/\/|www\.)[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<>"'),.;!?:])*/gi;

    let processed = placeholderText.replace(urlRegex, (rawUrl) => {
        let url = rawUrl;
        // Trim trailing punctuation that often rides along
        while (/[),.;!?:]$/.test(url)) {
            url = url.slice(0, -1);
        }
        const safeHref = ensureAbsoluteUrl(url).replace(/"/g, '%22');
        return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-amber-300 underline-offset-2 hover:underline">${url}</a>`;
    });

    // Restore anchors and ensure consistent styling.
    processed = processed.replace(/__ANCHOR_PLACEHOLDER_(\d+)__/g, (_, idx) => {
        const anchor = anchors[Number(idx)];
        if (!anchor) return '';
        const classAttr = /class\s*=\s*(['"])(.*?)\1/;
        if (classAttr.test(anchor)) {
            return anchor.replace(classAttr, (m, quote, cls) => {
                if (cls.includes('text-amber-300')) return m;
                return `class=${quote}${cls} text-amber-300 underline-offset-2 hover:underline${quote}`;
            });
        }
        return anchor.replace('<a ', '<a class="text-amber-300 underline-offset-2 hover:underline" ');
    });

    return processed;
};
