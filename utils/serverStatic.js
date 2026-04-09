import http, { get } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export async function serverStatic(req, res, __dirname) {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const data = await fs.readFile(filePath);

    const ext = path.extname(filePath);
    const contentType = getContentType(ext);

    try {
        sendResponse(res, 200, data, contentType);
    } catch(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }

}