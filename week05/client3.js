const net = require("net")

class Request {
    //method,url = host + port +path
    //body:k/v
    //headers
    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if(this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve,reject) => {
            const parser = new ResponseParser;
            if(connection){
               connection.write(this.toString());
            }
            else {
               connection = net.createConnection({
                host: this.host,
                port: this.port
            },() => {
                connection.write(this.toString());
            })
         }
         connection.on('data',(data) => {
                parser.recive(data.toString())
                // resolve(data.toString());
                console.log(parser.statusLine)
                connection.end();
            });
            connection.on('error',(err) => {
                reject(err);
                connection.end();
            })
        })
    }

}

class Response {

}

class ResponseParser {
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_VALUE = 3;
        this.WAITING_HEADER_LINE_END = 4;
        this.WAITING_HEADER_BLOCK_END = 4;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";

    }
    recive(string){
        for(let i = 0; i< string.length; i++){
            this.reciveChar(string.charAt(i))
        }
    }
    
    reciveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){
            console.log(char.charCodeAt(0))
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            } else if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            } else { 
                this.statusLine += char
            }
           
        }
    }
}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo"]:"customed"
        },
        body: {
            name:"winter"
        }
    })
    let response = await request.send();
    console.log(response);
}();





/*const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088 }, () => {
        console.log('connected to server!');
        let request = new Request({
            method: "POST",
            host: "127.0.0.1",
            port: "8088",
            path: "/",
            headers: {
                ["X-Foo"]:"customed"
            },
            body: {
                name:"winter"
            }
        })
        
        console.log(request.toString());
        client.write(request.toString());
        client.write(`
POST / HTTP/1.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r
\r
name=winter`);
    });
client.on('data',(data) => {
    console.log(data.toString());
    client.end();
});
client.on('end',() => {
    console.log('disconnected from server');
})

client.on('error',(err) => {
    console.log(err);
    client.end();
})*/