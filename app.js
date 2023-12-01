const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST" name="message"><input type="text"><button type="submit">Send</button></form></body>');
        res.write('</html>');
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