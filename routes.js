const fs = require('fs');

const requestHandler = (req, res) => {
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
        return req.on('end', () => {
            const parsdBody = Buffer.concat(body).toString();
            const message = parsdBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, err => {
                // Status code voor redirect
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>NODE.JS!!</title></head>');
    res.write('<body><h1>Hallo Wereld!!</h1></body>');
    res.write('</html>');
    res.end();

};

// Dit is een global module, waardoor we requestHandler kunnen gebruiken in andere scripts/
module.exports = requestHandler;