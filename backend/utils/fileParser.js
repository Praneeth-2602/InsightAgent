import pdfParse from 'pdf-parse/lib/pdf-parse.js';

/**
 * Parses uploaded file content.
 * Currently supports PDFs and plain text files.
 *
 * @param {Object} file - The uploaded file object.
 * @returns {Promise<string>} - Extracted plain text from the file.
 */
const parseFile = async (file) => {
    const buffer = file.data;

    if (file.mimetype === 'application/pdf') {
        try {
            const data = await pdfParse(buffer);

            // Optional: Log metadata for debugging (can be removed in prod)
            // console.log('Pages:', data.numpages);
            // console.log('Info:', data.info);
            // console.log('Metadata:', data.metadata);

            return data.text;
        } catch (err) {
            console.error('[PDF Parse Error]', err);
            return '';
        }
    }

    // Fallback: treat as plain text
    return buffer.toString('utf-8');
};

export default parseFile;
