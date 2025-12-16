import { loadScript } from './scriptLoader';

/**
 * Converts a File or Blob object to a Base64 string (without the data: URL prefix).
 * @param blob The file or blob to convert.
 * @returns A promise that resolves with the base64 encoded string.
 */
export const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            // remove the data URL prefix e.g. "data:image/png;base64,"
            const base64 = dataUrl.split(',')[1];
            if (base64) {
                resolve(base64);
            } else {
                // Handle cases where the split might fail or result is empty
                reject(new Error('Failed to convert blob to Base64 string.'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });


const PDF_JS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * Ensures the pdf.js library is loaded and configured.
 * This function is idempotent and will only load the script once.
 */
const loadPdfJs = async () => {
    if ((window as any).pdfjsLib) {
        return (window as any).pdfjsLib;
    }
    await loadScript(PDF_JS_SRC);
    const pdfjsLib = (window as any).pdfjsLib;
    if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
        return pdfjsLib;
    }
    throw new Error("PDF.js library failed to load.");
};


/** Extracts text content from a PDF file using a dynamically loaded pdf.js. */
export const pdfToText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        loadPdfJs().then(pdfjs => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async () => {
                try {
                    const loadingTask = pdfjs.getDocument({ data: reader.result });
                    const pdf = await loadingTask.promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const text = await page.getTextContent();
                        textContent += text.items.map((item: any) => item.str).join(' ');
                        if (i < pdf.numPages) {
                            textContent += '\n\n--- Page Break ---\n\n';
                        }
                    }
                    resolve(textContent);
                } catch (error) {
                    console.error('Error parsing PDF:', error);
                    reject(new Error('Failed to parse PDF. It may be corrupted or password-protected.'));
                }
            };
            reader.onerror = (error) => reject(error);
        }).catch(reject);
    });
};

/** Returns the number of pages in a PDF file using pdf.js. */
export const getPdfPageCount = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        loadPdfJs().then(pdfjs => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async () => {
                try {
                    const loadingTask = pdfjs.getDocument({ data: reader.result });
                    const pdf = await loadingTask.promise;
                    resolve(pdf.numPages);
                } catch (_error) {
                    reject(new Error('Failed to read PDF pages.'));
                }
            };
            reader.onerror = (error) => reject(error);
        }).catch(reject);
    });
};
