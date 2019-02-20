const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, `utf-8`);
const laptopData = JSON.parse(json);

// console.log(__dirname)
// ###: /Users/minhee/Coding/Nodejs/complet-javascript-course/99-bonus-1/starter
// console.log(laptopData)

//////////////////////////////// ROUTING BEGINS ////////////////////////////////
const server = http.createServer((req, res) => {
    // console.log('accessed')

    const pathName = url.parse(req.url, true).pathname // CREATES PATHNAME STRING
    // const query = url.parse(req.url, true).query // CREATES OBJ WITH QUERIES
    const id  = url.parse(req.url, true).query.id


    // PRODUCTS OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-overview.html`, `utf-8`, (err, data) => {
            let overviewOutput = data;

            fs.readFile(`${__dirname}/templates/template-card.html`, `utf-8`, (err, data) => {
                const cardsOutput = laptopData.map(e=> replaceTemplate(data, e)).join('')
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutput)
            })
        })

    } 
    
    // LAPTOP DETAIL 
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-laptop.html`, `utf-8`, (err, data)=>{
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop)
            res.end(output) 
        })
    } 

    // DISPLAY IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data)=>{
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(data)
        })
    }
    
    // NOT FOUND
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('URL NOT FOUND')

    }
    
});
//////////////////////////////// ROUTING ENDS ////////////////////////////////

server.listen(1337, 'localhost', () => {
    console.log('listening to request now on port 1337')
})


function replaceTemplate (originalHTML, laptop){
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName)
    output = output.replace(/{%IMAGE%}/g, laptop.image)
    output = output.replace(/{%PRICE%}/g, laptop.price)
    output = output.replace(/{%SCREEN%}/g, laptop.screen)
    output = output.replace(/{%STORAGE%}/g, laptop.storage)
    output = output.replace(/{%RAM%}/g, laptop.ram)
    output = output.replace(/{%CPU%}/g, laptop.cpu)
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
    output = output.replace(/{%ID%}/g, laptop.id)
    return output
}