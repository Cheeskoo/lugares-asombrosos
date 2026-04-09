import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { serverStatic } from './utils/serverStatic.js';

const PORT = 3000;

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

    if (!req.url.startsWith('/api')) {
        return await serverStatic(req, res, __dirname)
    } else if(req.url === '/api'){
        if(req.method === 'GET'){
            const route = path.join(__dirname, 'data.json');
            return await getContent(route, res)
        }
    }
});
server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`)
});

///npm run dev