import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = 3000;

const __dirname = import.meta.dirname;
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }
    if(req.url === '/api' && req.method === 'GET') {
        try{
            const jsonPath = path.join(__dirname, 'data.json');
            const data = await fs.readFile(jsonPath);
            
        }
    }
});

server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`)
});