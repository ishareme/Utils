function nameCut(name, len) {
    var _len = 0, _result = name;
    console.log(name)
    for (var i= 0; i < name.length; i++){
        var char = name.charAt(i)
        if (/[^\x00-\xff]/ig.test(char)){
            _len += 2;
        }
        else {
            _len += 1;
        }
        console.log('i',i)
        console.log(_len)
        if (_len > len){
            _result = name.slice(0, i) + '...'
            return _result
        }
    }
    return _result
}

//中文占两个位置
function nameLen(name) {
    var len;
    for(var i = 0; i <= name.length; i++){
        var char = name.charAt(i)
        if (/[^\x00-\xff]/ig.test(char)){
            len +=2;
        }
        else {
            len +=1;
        }
    }
    return len
}


//黄明照啊啊shine   ===> 15
//shine黄hmz明朝   ====> 14

var $inputTxt = document.querySelector('.input-txt')
var $result = document.querySelector('.result')


$inputTxt.addEventListener('change', function (event) {
    console.log(event)
    console.log($inputTxt.value)
    $result.innerText = nameCut($inputTxt.value, 9)
})