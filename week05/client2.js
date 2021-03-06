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
        if(connection)
          connection.write(this.toString());
        else connection = net.createConnection({
            host: this.host,
            port: this.port
        },() => {
            connection.write(this.toString());
        })
    }

}

class Response {

}


const client = net.createConnection({
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
        /*client.write(`
POST / HTTP/1.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r
\r
name=winter`);*/
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
})