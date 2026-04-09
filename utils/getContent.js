import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {sendResponse} from './sendResponse.js';
import {contentType} from './contentType.js';

export async function getContent(route, res) {
    try {
        const data = await fs.readFile(route); 
        const content = data[mathFloor(Math.random() * data.length)]
        console.log(typeof content);
        sendResponse(res, 200, content, contentType(content));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}