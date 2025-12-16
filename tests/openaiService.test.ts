import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prepareContentParts } from '../src/services/ai/caseAnalysisService';
import { extractResponseText } from '../src/services/ai/parser';

vi.mock('../src/utils/fileUtils', () => ({
    blobToBase64: vi.fn(async () => 'YmFzZTY0LWltYWdl'),
    pdfToText: vi.fn(async () => 'PDF TEXT CONTENT'),
    getPdfPageCount: vi.fn(async () => 3),
}));

// Helper to create File objects in Node (Node 20+ has File)
const makeFile = (name: string, type: string, content: string) => {
    return new File([content], name, { type });
};

describe('prepareContentParts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('builds parts for image, pdf, and pasted text', async () => {
        const imageFile = makeFile('photo.png', 'image/png', 'fake');
        const pdfFile = makeFile('document.pdf', 'application/pdf', 'fakepdf');
        const parts = await prepareContentParts([imageFile, pdfFile], 'Hello world');

        expect(parts).toHaveLength(3);
        expect(parts[0]).toContain('START OF DOCUMENT: photo.png');
        expect(parts[0]).toContain('data:image/png;base64,YmFzZTY0LWltYWdl');
        expect(parts[1]).toContain('START OF DOCUMENT: document.pdf');
        expect(parts[1]).toContain('PDF TEXT CONTENT');
        expect(parts[2]).toContain('START OF PASTED TEXT');
        expect(parts[2]).toContain('Hello world');
    });
});

describe('extractResponseText', () => {
    it('prefers output_text when present', () => {
        const text = extractResponseText({ output_text: 'hello' });
        expect(text).toBe('hello');
    });

    it('falls back to nested output content', () => {
        const text = extractResponseText({
            output: [
                {
                    content: [
                        { text: 'hi there' }
                    ]
                }
            ]
        });
        expect(text).toBe('hi there');
    });

    it('returns null when no text present', () => {
        const text = extractResponseText({ output: [] });
        expect(text).toBeNull();
    });
});
