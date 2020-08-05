var stdin = process.stdin;

stdin.setRawMode( true);


stdin.resume();
stdin.setEncoding( 'utf8');

stdin.on('data',function ( key ){
    if( key === '\u0003') {
        process.exit();
    }

    process.stdout.write( key.toString().charCodeAt(0).toString());
})

function getChar() {
    return new Promise(resolve => {
        stdin.on( 'data', function(key){
            resolve(key);
        })
    })
}

function up(n){
    stdout.write('\033['+n+'A');
}

void async function (){
    while(true) {
        let char = await getChar();
        if(char === "\u0003"){
            process.exit();
            break;
        }
            
        console.log(char.split('').map(c =>c.charCodeAt(0)));
    }
}()
