export function getContentType(ext) {
    switch (ext) {
        case '.html':
            return 'text/html; charset=utf-8';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpeg';
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}