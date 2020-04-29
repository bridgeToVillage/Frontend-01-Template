```js
function convertNumberToString(number,x){
    var integer = Math.floor(number);
    var fraction = number - integer;
    console.log(fraction);
    var string = '';
    while(integer > 0){
        string = String(integer % x) + string;
        integer = Math.floor(integer/x)
    }
    if(integer < 0){
       var negative = Math.abs(integer);
       string = "-" + convertNumberToString(negative,x);
    }
    return string;
}
```



