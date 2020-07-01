# 编程训练|解析四则运算表达式

状态机

BNF  这东西有点忘记了

四则运算

正则表示十进制

```js
/^0\.\d*(?:[eE][+-]?\d+)?$|^[1-9]\.\d*(?:[eE][+-]?\d+)?$|^\.\d+(?:[eE][+-]?\d+)?$|^0(?:[eE][+-]?\d+)?$|^[1-9]\d*(?:[eE][+-]?\d+)?$/

/(^(((0|([1-9]\d*))\.\d+?)|(\.\d+)|(0|([1-9]\d*)))([E|e][+|-]?\d+)?$)|(^0([B|b])([0|1])+$)|(^0([o|O])([0-7])+$)/
```

来一段代码

```js
<script>
    var regexp = /([0-9\.]+)|([ \t\n\r]+)|[\r\n]+|\*|\/|\+|\-/g
    var dictionary = ["Number", "Whitespace","LineTerminator","*","/","+","-"];

    function tokenize(source){
        var result = null;
        var lastIndex = 0;
        do {
            lastIndex = regexp.lastIndex;
            result = regexp.exec(source);
            if(!result) break;

            let token = {
                type: null,
                value: null
            }
            for(var i=1; i<= dictionary.length; i++){
                if(result[i]){
                    console.log(dictionary[i - 1]);
                }
            }
            console.log(result[0]);
        }
        while (result);

    }
    tokenize("1024 + 10 * 25")
</script>
```

体会一下正则的编译原理。。

跟状态机相比，正则的分解步骤更简捷，当然理解起来也更难

状态机写法(参考课程)：

```js
<script>
var token = [];
const start = char => {
    if(char === '1' 
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
        || char === '0'
    ) {
        token.push(char);
        return inNumber;   
    }
    if(char === '+' 
        || char === '-'
        || char === '*'
        || char === '/'
    ) {
        emmitToken(char, char);
        return start
    }
    if(char === ' ') {
        return start;
    }
    if(char === '\r' 
        || char === '\n'
    ) {
        return start;
    }
}
const inNumber = char => {
    if(char === '1' 
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
        || char === '0'
    ) {
        token.push(char);
        return inNumber;
    } else {
        emmitToken("Number", token.join(""));
        token = [];
        return start(char); // put back char
    }
}



function emmitToken(type, value) {
    console.log(value);
}

var input = "1024 + 10 * 25"

var state = start;

for(var c of input.split(''))
    state = state(c);

state(Symbol('EOF'))

</script>

```





MultiplicativeExpression:

```js
function MultiplicativeExpression(source){
        //遇到number，做一次生产
        if(source[0].type === "Number"){
            let node = {
                type: "MultiplicativeExpression",
                children: source.shift()
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"&& source.length> 1 && 
        source[1].type === "*"){
            let node = {
                type: "MultiplicativeExpression",
                children: [source.shift(),source.shift(),source.shift()]
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"&& source.length> 1 && 
        source[1].type === "/"){
            let node = {
                type: "MultiplicativeExpression",
                children: [source.shift(),source.shift(),source.shift()]
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression")
            return source[0]

        throw new Error();
    }
```

AdditiveExpression:

```js
function AdditiveExpression(source){
        if(source[0].type === "Number") {
            MultiplicativeExpression(source)
            return AdditiveExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift()]
            }
            source.unshift(node)
            return AdditiveExpression(source)
        }
        if(source[0].type === "AdditiveExpression"&& source.length> 1 && 
        source[1].type === "+"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift(),source.shift()]
            }
            MultiplicativeExpression(source);
            node.children.push(source.shift())
            source.unshift(node);
            return AdditiveExpression(source)
        }

        
        if(source[0].type === "AdditiveExpression"&& source.length> 1 && 
        source[1].type === "-"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift(),source.shift()]
            }
            MultiplicativeExpression(source);
            node.children.push(source.shift())
            source.unshift(node);
            return AdditiveExpression(source)
        }
        if(source[0].type === "AdditiveExpression")
            return source[0];
    }
```

Expression:

```js
function Expression(source){
        if(source[0].type === "AdditiveExpression" && 
        source[1].type === "EOF"){
            let node = {
                type: "",
                children: []
            }
            source.unshift(node);
            return node;
        }
        AdditiveExpression(source)
        return Expression(source);
    }
```

完整解析：

```js
<script>
    var regexp = /([0-9\.]+)|([ \t\n\r]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
    var dictionary = ["Number", "Whitespace","LineTerminator","*","/","+","-"];

    function* tokenize(source){
        var result = null;
        var lastIndex = 0;
        do {
            lastIndex = regexp.lastIndex;
            result = regexp.exec(source);
            if(!result) break;
            if(regexp.lastIndex - lastIndex > result[0].length)
                throw new Error("Unexpected token \"" + source.slice(lastIndex,regexp.lastIndex -  result[0].length) + "\"!")

            let token = {
                type: null,
                value: null
            }
            for(var i=1; i<= dictionary.length; i++){
                if(result[i]){
                    token.type = (dictionary[i-1]);
                }
                    // console.log(dictionary[i - 1]);
            }
            token.value = (result[0]);
            yield token
        }
        while (result);

        yield {type : "EOF"}
    }

    function Expression(source){
        if(source[0].type === "AdditiveExpression" && 
        source[1].type === "EOF"){
            let node = {
                type: "",
                children: []
            }
            source.unshift(node);
            return node;
        }
        AdditiveExpression(source)
        return Expression(source);
    }

    function AdditiveExpression(source){
        if(source[0].type === "Number") {
            MultiplicativeExpression(source)
            return AdditiveExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift()]
            }
            source.unshift(node)
            return AdditiveExpression(source)
        }
        if(source[0].type === "AdditiveExpression"&& source.length> 1 && 
        source[1].type === "+"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift(),source.shift()]
            }
            MultiplicativeExpression(source);
            node.children.push(source.shift())
            source.unshift(node);
            return AdditiveExpression(source)
        }

        
        if(source[0].type === "AdditiveExpression"&& source.length> 1 && 
        source[1].type === "-"){
            let node = {
                type: "AdditiveExpression",
                children: [source.shift(),source.shift()]
            }
            MultiplicativeExpression(source);
            node.children.push(source.shift())
            source.unshift(node);
            return AdditiveExpression(source)
        }
        if(source[0].type === "AdditiveExpression")
            return source[0];
    }

    function MultiplicativeExpression(source){
        //遇到number，做一次生产
        if(source[0].type === "Number"){
            let node = {
                type: "MultiplicativeExpression",
                children: source.shift()
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"&& source.length> 1 && 
        source[1].type === "*"){
            let node = {
                type: "MultiplicativeExpression",
                children: [source.shift(),source.shift(),source.shift()]
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression"&& source.length> 1 && 
        source[1].type === "/"){
            let node = {
                type: "MultiplicativeExpression",
                children: [source.shift(),source.shift(),source.shift()]
            }
            source.unshift(node);
            return MultiplicativeExpression(source)
        }

        if(source[0].type === "MultiplicativeExpression")
            return source[0]

        throw new Error();
    }

    let source = [];
    for(let token of tokenize("5 + 1024 * 2")){
        if(token.type !== "Whitespace" && token.type !== "LineTerminator")
            source.push(token)
    }
    console.log(Expression(source))
</script>
```

