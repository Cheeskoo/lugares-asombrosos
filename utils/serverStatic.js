import fs from 'node:fs/promises';
import path from 'node:path';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

/* Sirve archivos de la carpeta public/ */
export async function serverStatic(pathname, res, __dirname) {
    const publicDir = path.join(__dirname, 'public');
    const filePath = path.join(publicDir, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));

    /* Evita que se pidan archivos fuera de public/ */
    if (!filePath.startsWith(publicDir + path.sep)) {
        return sendResponse(res, 403, 'Forbidden', 'text/plain');
    }

    try {
        const data = await fs.readFile(filePath);
        const contentType = getContentType(path.extname(filePath));
        sendResponse(res, 200, data, contentType);
    } catch (err) {
        if (err.code === 'ENOENT' || err.code === 'EISDIR') {
            return sendResponse(res, 404, 'Not Found', 'text/plain');
        }
        console.error(err);
        sendResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }), 'application/json');
    }
}
