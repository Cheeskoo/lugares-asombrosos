import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';

/* Lee data.json y responde con un lugar elegido al azar */
export async function getContent(route, res) {
    try {
        const data = await fs.readFile(route, 'utf-8');
        const lugares = JSON.parse(data);
        const lugar = lugares[Math.floor(Math.random() * lugares.length)];
        sendResponse(res, 200, JSON.stringify(lugar), 'application/json; charset=utf-8');
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }), 'application/json');
    }
}
