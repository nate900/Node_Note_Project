const http = require('http');
const fs = require('fs');

// Create server with request and response objects passed into callback
const server = http.createServer((req, res) => {
    console.log('New request has been made');
    
    // set header content types
    res.setHeader('Content-Type', 'text/html');

    // send back index page
    let path = './';
    switch(req.url){
        default:
            path += 'index.html';
            break;
    }
    
    // send an html file to the client
    fs.readFile(path, (error, data) => {
        if(error){
            console.log(error);
        }

        // end the response
        res.end(data);
    });

});

server.listen(3000, 'localhost', () => {
    
    console.log('Server started');
});