var tty = require('tty')
var ttys = require('ttys')
var rl = require('readline')

var stdin = ttys.stdin;
var stdout = ttys.stdout;

// stdout.write("Hello world!\n");
// stdout.write("\033[1A");
// stdout.write("jiang\n");

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function ask(question) {
    
}