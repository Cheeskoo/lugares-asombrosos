import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

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

    if(req.url === '/api' && req.method === 'GET') {
        try{
            const jsonPath = path.join(__dirname, 'data.json');
            const data = await fs.readFile(jsonPath, 'utf-8');

            res.writeHead(200,{
                'Content-type': 'application/json',
                'Charset': 'utf-8'
            })
            res.end(data);
        }catch(err){
            res.writeHead(500, {
                'Content-type': 'application/json'});
                res.end(JSON.stringify({
                    error: `No se pudo leer la base de datos`
                }))
    }
}else {
        res.writeHead(404,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ message:'Ruta no encontrada'}))
    }

});

server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`)
});