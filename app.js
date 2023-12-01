const http = require('http');
const fs = require('fs');
// const { log } = require('console');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsdBody = Buffer.concat(body).toString();
            const message = parsdBody.split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt', message);
        });
        // Status code voor redirect
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>NODE.JS!!</title></head>');
    res.write('<body><h1>Hallo Wereld!!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);