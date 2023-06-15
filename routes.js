const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Username</title></head>');
        res.write('<body><h2>Salve!</h2><form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Register</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Username</title></head>');
        res.write('<body><ul><li>Zé</li><li>Maria</li><li>Jão</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
            fs.writeFile('name.txt', username, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/' );
                return res.end();
            })
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello</title></head>');
    res.write('<body>Hello</body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler: requestHandler
};

//module.exports = requestHandler;
//module.exports.handler = requestHandler;
//exports.handler = requestHandler;
