import http from 'node:http';
import path from 'node:path';
import { serverStatic } from './utils/serverStatic.js';
import { getContent } from './utils/getContent.js';
import { sendResponse } from './utils/sendResponse.js';

const PORT = process.env.PORT || 3000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    /*Pre flight request*/
    if (req.method === 'OPTIONS') {
        res.statusCode = 204; /*No content*/
        res.end();
        return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname === '/api') {
        if (req.method === 'GET') {
            const route = path.join(__dirname, 'data.json');
            return await getContent(route, res);
        }
        return sendResponse(res, 405, JSON.stringify({ error: 'Method Not Allowed' }), 'application/json');
    }

    if (pathname.startsWith('/api')) {
        return sendResponse(res, 404, JSON.stringify({ error: 'Not Found' }), 'application/json');
    }

    return await serverStatic(pathname, res, __dirname);
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
