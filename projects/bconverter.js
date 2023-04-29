/**
 * bconver.js
 * This file contains some functions for converting from, to specific
 * number base system.
 */


function getFirstLast(str) {

    // get the position of the '.'
    let dotIndex = str.indexOf('.');

    // this is the first part before the decimal point.
    let firstPart = str.slice(0, dotIndex);


    // this is the last part, i.e after the decimal point
    let lastPart = str.slice(dotIndex + 1, str.length);

    console.log('First part: ' + firstPart);
    console.log('Last part: ' + lastPart);

    return {'firstPart': firstPart, 'lastPart': lastPart};
}

/***
 * This function converts any number base system to decimal.
 * @param num -> the actual number to convert from to decimal
 * @param radix -> the base we're converting from
 * 
 */

 function toDecimal(num, radix) {

    let result;
    let content = '';

    // string version of num
    let numStr = num.toString();

    // check if the number has a decimal point (a floating point number)
    if (numStr.indexOf('.') != -1) {


        let parts = getFirstLast(numStr);


        // this is the first part before the decimal point.
        let firstPart = parts['firstPart'];


        // this is the last part, i.e after the decimal point
        let lastPart = parts['lastPart'];


        let obj = evaluateInteger(firstPart, radix);
        result = obj['result'];
        content = "Converting the first part (i.e " + firstPart + "), before the decimal point.<br>" + 
        obj['HTMLWorkingContent'];

        let obj2 = evaluateFloat(lastPart, radix);

        result += obj2['result'];

        content += "<br>Converting the last part(i.e " + lastPart + "), after the decimal point.<br>" +
        obj2['HTMLWorkingContent'];

        content += "<br>Next we sum the result of the first part and the last part.<br>";
        content += obj['result'] + " + " + obj2['result'];
        content += "<br>   = " + result + "<br>";

        console.log(result);
    } else {

        let obj = evaluateInteger(numStr, radix);
        result = obj['result'];
        content = obj['HTMLWorkingContent'];
    }

    content += "<br> &there4; (" + numStr + ")<sub>" + radix + 
    "</sub> = (" + result + ")<sub>10</sub><br>";

    return {'result': result, 'HTMLWorkingContent': content};
}

/***
 * This function is used for summing numbers in an array.
 * @param arr -> is the array to sum the numbers.
 * @returns the sum of the numbers in the array.
 */

function sum(arr) {

    let sum = 0;
    let content = "";

    arr.forEach(element => {
        content += element + " + ";
       sum += element; 
    });

    content = content.slice(0, content.length - 2);

    let obj = {
        'sum': sum,
        'HTMLWorkingContent': content
    };

    return obj;

}

/***
 * This function is used for converting the integer part of the number base.
 * @param num is the num to convert the base, this must be a string.
 * @param radix is the base we're coverting from.
 * @returns the result of the coverted base.
 */
function evaluateInteger(num, radix) {

    let content = "";

    let len = num.length;
    let count = 0;
    do {

        content += num[count++] + "<sup>" + --len + "</sup> ";

    } while (len != 0);

    content += "<br> = ";

    len = num.length;
    let result = [];

    for (let i = 0; i < num.length; i++) {

        let curr = parseInt(num[i], radix);
        let tmp = len;

        content += "(" + curr + " * " + radix + "<sup>" + --tmp + "</sup>) + ";
        result[result.length] = curr * Math.pow(radix, --len);
    }

    // remove the last +
    content = content.slice(0, content.length - 2);

    let sumObj = sum(result);
    let summation = sumObj['sum'];
    let summationContent = sumObj['HTMLWorkingContent'];

    content += "<br> = " + summationContent + "<br> = " + summation + "<br>";
    content += "(" + num + ")<sub>" + radix + "</sub> = (" + summation + ")<sub>10</sub><br>";

    console.log(result);

    let obj = {
        'result': summation,
        'HTMLWorkingContent': content
    };

    return obj;
}


/***
 * This function is used for converting the floating-point part(numbers after the decimal) of the number base.
 * @param num is the num to convert the base, this must be a string.
 * @param radix is the base we're coverting from.
 * @returns the result of the coverted base.
 */
 function evaluateFloat(num, radix) {

    let content = "";

    let len = num.length;
    let count = 0;
    do {

        content += num[count++] + "<sup>-" + count + "</sup> ";

    } while (count != len);

    content += "<br> = ";

    len = num.length;
    let result = [];

    for (let i = 0; i < num.length; i++) {
        let curr = parseInt(num[i], radix);
        let tmp = i + 1, tmp2 = tmp;

        content += "(" + curr + " * " + radix + "<sup>-" + (i + 1) + "</sup>) + ";
        result[result.length] = curr * Math.pow(radix, -tmp);
    }

    // remove the last +
    content = content.slice(0, content.length - 2);

    let sumObj = sum(result);
    let summation = sumObj['sum'];
    let summationContent = sumObj['HTMLWorkingContent'];

    content += "<br> = " + summationContent + "<br> = " + summation + "<br>";
    content += "(" + num + ")<sub>" + radix + "</sub> = (" + summation + ")<sub>10</sub><br>";

    console.log(result);

    let obj = {
        'result': summation,
        'HTMLWorkingContent': content
    };

    return obj;
}




function fromSelected() {

    let fromSelect = document.getElementById('from').value;

    fromSelect = 't' + fromSelect;

    document.getElementById(fromSelect).disabled = 'true';
    
}

/**
 * Method for performing the conversion....
 */
function doConversion() {

			
    let num = document.getElementById('ctarget').value;
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let err = document.getElementById('error');
    const x = document.getElementById('result');
    const working = document.getElementById('working');

    err.style.display = 'none';
    x.style.display = 'none';
    working.style.display = 'none';

    // remove white spaces from the user input
    num = num.replace(/ /g, '');

    if (num.length == 0) {
        err.innerHTML = "Oops!!!, Do you notice? you left the input field empty";
        err.style.display = 'block';
        return;
    }

    for(let i = 0; i < num.length; i++) {

        if (num[i] == '.')
            continue;
        
        if (isNaN(parseInt(num[i], parseInt(from)))) {
            err.innerHTML = "Base " + from + " number system must not contain '" + num[i];
            err.innerHTML += "'.<br>Found at position: " + (i + 1) + ".<br>";

            err.style.display = 'block';
            return;
        }
    }

    let res = {
        'result': '',
        'HTMLWorkingContent': ''
    };


    /***
     * If we're converting to decimal.
     */
    if (to == '10') {
        res = toDecimal(num, parseInt(from));

    } else if (from == '10') {
        // if we're converting from decimal to other base
        res = fromDecimal(num, parseInt(to));
    } else {
        // if we're neither converting from nor to decimal, we first
        // convert the number to decimal, then from decimal to the actual base
        // we're converting to.

        let output1 = toDecimal(num, parseInt(from));
        let output2 = fromDecimal(output1['result'], parseInt(to));
        
        let content = "If we're neither converting from nor to decimal, we first convert" +
        " the number to decimal, then from decimal to the base we're actually converting to" +
        " (i.e base " + to + ")<br>";
        content += "<h4>Step 1:</h4> <strong>Convert " + num + "<sub>" + from + "</sub> to decimal:</strong><br><br>";

        content += output1['HTMLWorkingContent'] + "<br><br>";

        content += "<h4>Step 2:</h4> <strong>Convert " + output1['result'] + "<sub>10</sub> to base " + to + ":</strong><br><br>"
        + output2['HTMLWorkingContent'];

        content += "<br><br>&there4; <strong>(" + num + ")<sub>" + from + "</sub> = (" + 
        output2['result'] + ")<sub>" + to + "</sub></strong><br>";

        res['result'] = output2['result'];
        res['HTMLWorkingContent'] = content;
    }

    x.innerHTML = "(" + num + ")<sub>" + from + "</sub> = " +
        "(" + res['result'] + ")<sub>" + to + "</sub>";
    
    working.innerHTML = '<strong style="color:green">TASK: Convert ' + num + ' from base ' + from + 
    ' to base ' + to + '</strong><br><br>' + res['HTMLWorkingContent'];

    x.style.display = 'block';
    working.style.display = 'block';
}



function calIntFromDecimal(num, radix) {

    let quotient = num;
    let remainder = 0;
    let res = [];
    let content, count = 0;

    content = "<table class='table table-dark table-hover'> <thead></thead><tr><th>#</th><th>Division</th><th>Quotient</th><th>Remainder</th></tr></thead><tbody>";

    do {

        let tmp = quotient;
        quotient = parseInt(quotient / radix);
        remainder = tmp % radix;

        if (radix == 16) 
            remainder = swapHexNumbers(remainder);

        res[res.length] = remainder;

        content += "<tr>"
        content += "<td>" + (++count) + "</td>"
        content += "<td>" + tmp + "/" + radix + "</td>";
        content += "<td>" + quotient + "</td>";
        content += "<td>" + remainder + "</td>";
        content += "</tr>";

        console.log('quotient: ' + quotient);
        console.log('remainder: ' + remainder);

    } while (quotient != 0);

    content += "</tbody></table>";

    let result = '';

    for(let i = 1; i <= res.length; i++) {
        result += res[res.length - i];
    } 

    console.log(result);
    
    return {'result': result, 'HTMLWorkingContent': content};
}


function calFloatFromDecimal(num, radix) {

    let quotient = num;
    let carry = 0;
    let res = [];
    let content, count = 0;

    content = "<table class='table table-dark table-hover'> <thead><tr><th>#</th><th>Multiplication</th><th>Result</th><th>Carry</th></tr></thead><tbody>";

    do {

        let tmp = quotient;
        let mul = "" + (parseFloat(quotient * radix));
        console.log("multi: " + mul);
        if (mul.indexOf('.') != -1) {
            let parts = getFirstLast(mul);

            let firstPart = parts['firstPart'];
            let lastPart = parts['lastPart'];

            carry = firstPart;
            quotient = parseFloat('0.' + lastPart);
        } else {
            carry = parseInt(mul);
            quotient = 0;
        }

        if (radix == 16)
            carry = swapHexNumbers(carry);
        
        res[res.length] = carry;
        
        content += "<tr>"
        content += "<td>" + (++count) + "</td>";
        content += "<td>" + tmp + "*" + radix + "</td>";
        content += "<td>" + quotient + "</td>";
        content += "<td>" + carry + "</td>";
        content += "</tr>";
        
        /*if (res.length > 9)
        				break;*/

    } while (quotient != 0);

    content += "</table>";

    let result = '0.';

    for(let i = 0; i < res.length; i++) {
        result += res[i];
    } 

    console.log(result);
    
    return {'result': result, 'HTMLWorkingContent': content};
}

/**
 * converts a number from decimal to other number bases
 * @param {*} num the number to convert
 * @param {*} radix the base we're converting to
 * @returns 
 */
function fromDecimal(num, radix) {

    let content = '';
    let numStr = num.toString();
    let result;

    // if the contains a dot '.'
    if (numStr.indexOf('.') != -1) {

        let parts = getFirstLast(numStr);
        let firstPart = parts['firstPart'];
        let lastPart = parts['lastPart'];

        let obj = calIntFromDecimal(firstPart, parseInt(radix));
        let obj2 = calFloatFromDecimal('0.' + lastPart, parseInt(radix));

        let res1, res2;
        res1 = Number(obj['result']);
        res2 = Number(obj2['result']);

        if (radix == 16) {
            res1 = parseInt(res1, 16);
            res2 = parseFloat(res1, 16);
        }
        if (radix != 2 && radix != 16)
            result = res1 + res2;
        else
            result = obj['result'] + '.' + getFirstLast(obj2['result'])['lastPart'];

        content = "Converting the first part (i.e " + firstPart + "), before the decimal point.<br>" + 
        obj['HTMLWorkingContent'];
        content += "<br>(" + firstPart + ")<sub>10</sub> = (" + obj['result'] + ")<sub>" + radix + "</sub><br>";

        content += "<br>Converting the last part(i.e " + lastPart + "), after the decimal point.<br>" +
        obj2['HTMLWorkingContent'];
        content += "<br>(0." + lastPart + ")<sub>10</sub> = (" + obj2['result'] + ")<sub>" + radix + "</sub><br>";

        content += "<br>Next we sum the result of the first part and the last part.<br>";
        content += obj['result'] + " + " + obj2['result'];
        content += "<br>   = " + result + "<br>";
    
    } else {

        let obj = calIntFromDecimal(numStr, parseInt(radix));
        result = obj['result'];
        content = obj['HTMLWorkingContent'];
    }
    

    content += "<br> &there4; (" + numStr + ")<sub>10</sub> = (" + 
    result + ")<sub>" + radix + "</sub><br>";

    return {'result': result, 'HTMLWorkingContent': content};
}


function swapHexNumbers(num) {
    let result, x = num;
    

    if(x == 10) {
        result = 'a';
    } else if (x == 11) {
        result = 'b';
    } else if (x == 12) {
        result = 'c';
    } else if (x == 13) {
        result = 'd';
    } else if (x == 14) {
        result = 'e';
    } else if (x == 15) {
        result = 'f';
    } else {
        result = num;
    }

    return result;
}
