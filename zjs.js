;(function (global, factory) {

    if( typeof define === 'function' && define.amd ){
        define([], factory);
    }
    else if( typeof exports === 'object' ){
        module.exports = factory;
    }
    else{
        global.MZ = global.$ = factory;
    }
})(this, (function () {
    
    function MZ() {
        
    }

    //判断类型
    //数组判断
    MZ.prototype.isArray = Array.isArray || function (arr) {
        return Array.prototype.toString.call(arr) === '[object Array]'
    }
    //判断数字
    MZ.prototype.isNumber = function (val) {
        //isFinite 检测是否为无穷大
        //isNumber(parseInt(a))   // true
        // 第一种写法
        return typeof val === 'number' && isFinite(val)
        //第二种写法
        // return typeof val === 'number' && !isNaN(val)
    }
    //判断字符串
    MZ.prototype.isString = function (str) {
        return typeof str === 'string'
    }
    //判断布尔值
    MZ.prototype.isBoolean = function (bool) {
        return typeof bool === 'boolean'
    }
    //判断函数
    MZ.prototype.isFun = function (fn) {
        return typeof fn === 'function'
    }
    //判断对象
    MZ.prototype.isObject = function (obj) {
        //{},[],null 用typeof检测不出来
        return Object.prototype.toString.call(obj) === '[object Object]'
    }
    //判断undefined
    MZ.prototype.isUndefined = function (undefined) {
        return typeof undefined === 'undefined'
    };
    MZ.prototype.isNull = function (n) {
        //判断空值用 n === null
        return n === null
    }
    MZ.prototype.isNaN = function (val) {
        return typeof val === 'number' && isNaN(val)
    }
    MZ.prototype.getType = function (item) {
        if (this.isArray(item)){
            return 'Array'
        }
        // else if (this.isString(item)){
        //     return 'String'
        // }
        // else if (this.isBoolean(item)){
        //     return 'Boolean'
        // }
        // else if (this.isFun(item)){
        //     return 'function'
        // }
        // else if (this.isUndefined(item)){
        //     return 'undefined'
        // }
        // else if (this.isNull(item)){
        //     return 'null'
        // }
        // else {
        //     return
        // }
        if (typeof item !== "object" && typeof item !== "function") return typeof item;
        return toString.call(item).slice(8, -1).toLowerCase();
    }




    //数组 和 某些字符串(arg)
    var emptyArray = []
    var concat = emptyArray.concat
    var filter = emptyArray.filter
    var foreach = emptyArray.forEach
    var map = emptyArray.map
    var reduce = emptyArray.reduce
    //splice(n,m,x)从索引n开始删除m个元素  返回值是删除的值
    var splice = emptyArray.splice
    //slice() 方法返回一个从开始到结束（不包括结束）的新数组 0开始
    var slice = emptyArray.slice
    var sort = emptyArray.sort


    //判断两个数组是否相等 (数组的顺序的)
    MZ.prototype.compareArray = function (arr1, arr2) {
        if (!this.isArray(arr1) || !this.isArray(arr2)) return false
        if (arr1.length !== arr2.length) return false
        for (var i=0; i< arr1.length; i++){
            if (!(arr1[i] == arr2[i])){
                return false
            }
        }

    }
    //数组(字符串、对象)包含某项
    MZ.prototype.contains = function (arg, item) {
        if (!this.isString(arg) && !this.isArray(arg) && !this.isObject(arg)) return
        if (this.isObject(arg)){
            return arg.hasOwnProperty(item)
        }
        return arg.indexOf(item) > -1
    }
    //数组(字符串)移除某项 根据项 val 可以是字符串和数组
    MZ.prototype.removeByItem = function (arg, val) {
        if ((!this.isString(arg) && !this.isArray(arg)) || !this.isUndefind(val)) return
        return this.isString(arg) ? arg.replace(new RegExp(val, 'g'), '') : this.isArray(val) ? filter.call(arg, function (item) {
            for (var i = 0; i < val.length; i++){
                if(item === val[i]){
                    return false
                }
            }
            return true;
        }) : filter.call(arg, function (item) {
            return val !== item;
        })
    }
    //数组(字符串)移除某项 根据索引  index 1开始 num 个数
    MZ.prototype.removeByIndex = function (arg, index, num) {
        if ((!this.isString(arg) && !this.isArray(arg)) || !this.isNumber(index) || !this.isNumber(num)) return
        return this.isString(arg) ? arg.substr(index + num) : slice.call(arg, 0, index).concat(slice.call(arg, index + num))
    }
    //数组(字符串)增加某项 根据索引
    //item 可以为 String 和 Array 最终都会转为字符串
    MZ.prototype.add = function (arg, index, item) {
        if ((!this.isString(arg) && !this.isArray(arg)) || (!this.isString(item) && !this.isArray(item)) || !this.isNumber(index)) return
        var _arr = this.isString(arg) ? arg.split('') : arg
        splice.call(_arr, index, 0, this.isString(item) ? item : item.join(''))
        return this.isString(arg) ? _arr.join('') : _arr
    }
    //数组(字符串)反转
    MZ.prototype.reverse = function (arg) {
        if(!this.isString(arg) && !this.isArray(arg)) return
        return this.isString(arg) ? arg.split('').reverse().join('') : arg.reverse()
    }
    // 数组(字符串)去重
    MZ.prototype.uniqArr = function (arg) {
        if(!this.isString(arg) && !this.isArray(arg)) return
        var arr = this.isString(arg) ? arg.split('') : arg
        return this.isString(arg) ? filter.call(arr,function (item,index) {
            return arr.indexOf(item) === index
        }).join('') : filter.call(arr,function (item,index) {
            return arr.indexOf(item) === index
        })
        // var result=[]
        // for (var i=0; i< arr.length; i++){
        //     if (result.indexOf(arr[i]) === -1){
        //         result.push(arr[i])
        //     }
        // }
        // return this.isString(arg) ? result.join('') : result;
    }
    //数组(字符串)从小到大
    MZ.prototype.sortSTB = function (arg) {
        if(!this.isString(arg) && !this.isArray(arg)) return
        return this.isString(arg) ? sort.call(arg.split(''),this.publicFun.sortSTBFun).join('') : sort.call(arg, this.publicFun.sortSTBFun)
    }
    //数组(字符串)从大到小
    MZ.prototype.sortBTS = function (arg) {
        if(!this.isString(arg) && !this.isArray(arg)) return
        return this.isString(arg) ? sort.call(arg.split(''),this.publicFun.sortBTSFun).join('') : sort.call(arg, this.publicFun.sortBTSFun)
    }
    //数组(字符串[数字])的最大值
    MZ.prototype.max = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        return this.isString(arg) ? Math.max.apply(Math, arg.split('')) : Math.max.apply(Math, arg);
    }
    //数组(字符串[数字])的最小值
    MZ.prototype.min = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        return this.isString(arg) ? Math.min.apply(Math, arg.split('')) : Math.min.apply(Math, arg);
    }
    //将数组(字符串)分为指定大小的数组块 chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]] chunk('12345', 2) -> [[1,2],[3,4],[5]]
    //@param arr Array  size Number
    MZ.prototype.chunk = function (arg,size) {
        if ((!this.isArray(arg) && !this.isString(arg)) || !this.isNumber(size)) return;
        var _len = Math.ceil(arg.length / size)
        var _result = []
        for (var i = 0; i < _len; i++){
            _result.push(slice.call(arg, i * size, i * size + size))
        }
        return _result
    }
    //统计数组(字符串)中的某项出现的个数
    MZ.prototype.countItem = function (arg, val) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        // var arr = this.isString(arg) ? arg.split('') : arg
        //reduce的第一个参数:callback  第二个参数 initVal(可选)
        return this.isString(arg) ? arg.split(val).length - 1 : reduce.call(arg, function (counter, item) {
            return item === val ? counter + 1 : counter + 0;
        },0)
    }
    //浅度合并数组 [1,[2,3],[4,5],6,[7,[89]] 变成 [1,2,3,4,5,6,7,[8,9]] ,
    MZ.prototype.flatten = function (arr) {
        if (!this.isArray(arr)) return;
        return concat.apply([],arr)
    }
    //深度合并数组
    MZ.prototype.deepFlatten = function (arr) {
        var self = this
        if (!this.isArray(arr)) return;
        return concat.apply([], map.call(arr, function (item) {
            return self.isArray(item) ? self.deepFlatten(item) : item;
        }))
    }
    //数组的交集
    MZ.prototype.intersection = function (arrA, arrB) {
        if (!this.isArray(arrA) && !this.isArray(arrB)) return;
        return filter.call(arrA, function (itemA) {
            return arrB.indexOf(itemA) > -1;
        })
    }
    //数组的并集
    MZ.prototype.union = function (arrA, arrB) {
        if (!this.isArray(arrA) && !this.isArray(arrB)) return;
        return concat.call(arrA, filter.call(arrB, function (itemB) {
            return arrA.indexOf(itemB) === -1;
        }))
    }
    //数组的差集
    MZ.prototype.difference = function (arrA, arrB) {
        if (!this.isArray(arrA) && !this.isArray(arrB)) return;
        return filter.call(arrA, function (itemA) {
            return arrB.indexOf(itemA) === -1
        }).concat(filter.call(arrB, function (itemB) {
            return arrA.indexOf(itemB) === -1
        }))
    }
    //返回数组(字符串)第一个值
    MZ.prototype.fist = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        return arg[0] || slice.call(arg, 0, 1)
    }
    //返回数组(字符串)最后一个值
    MZ.prototype.last = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        return arg[arg.length - 1] || slice.call(arg, 0, -1)
    }
    //返回数组(字符串)的前几个值
    MZ.prototype.firstFew = function (arg, size) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        var _size = size || 0
        return slice.call(arg, 0, _size)
    }
    //返回数组(字符串)的最后几个值
    MZ.prototype.lastFew = function (arg, size) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        var _size = size || 0
        return slice.call(arg, 0, -(_size))
    }
    //返回数组(字符串)的nth 从0开始
    MZ.prototype.get = function (arg, nth) {
        if ((!this.isArray(arg) && !this.isString(arg)) || !this.isNumber(nth)) return;
        return slice.call(arg, nth, nth + 1).join('')
    }
    //将数组(字符串)打乱
    MZ.prototype.mess = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        return this.isString(arg) ? sort.call(arg.split(''), function () {
            return Math.random() - 0.5
        }).join('') : sort.call(arg, function () {
            return Math.random() - 0.5
        })
    }
    //数组转字符串
    MZ.prototype.arrToStr = function (arr) {
        if(!this.isArray(arr)) return;
        return arr.toString().split(',').join('')
    }
    //数组转对象 第二个参数分割符可选(默认为 = )
    // ["a=1","b=2","c=3"] ==> obj={a:1,b:2,C:3}
    // arrToObj(["a|1","b|2","c|3"],'|')
    // [['a',1],['b',2]] ==> {a: 1, b: 2}
    MZ.prototype.arrToObj = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        var _symbol = arguments[1] || '='
        var self = this
        return reduce.call(arg, function (obj, cur) {
            if (self.isArray(cur) && cur.length === 2){
                obj[cur[0]] = cur[1]
            }
            else {
                cur.indexOf(_symbol) > -1 ? obj[cur.split(_symbol)[0]] = cur.split(_symbol)[1] :  obj[cur] = '';
            }
            return obj;
        }, {})
    }
    MZ.prototype.arrToJSON = function (arg) {
        return JSON.stringify(arg)
    }


    //字符串
    //首字符转大写 两种情况 1.第二参数 true myName ==> Myname 2.无第二参数(或为false) myName ==> Myame
    MZ.prototype.capitalize = function (str, bool) {
        if (!this.isString(str)) return
        var b = bool || false;
        return b ?  str.slice(0,1).toUpperCase() + str.slice(1,str.length).toLowerCase() : str.slice(0,1).toUpperCase() + str.slice(1,str.length);
    }
    //所有单词首字母大写
    MZ.prototype.capitalizeEveryWord = function (str) {
        return str.replace(/\b[a-z]/g, function (match) {
            return match.toUpperCase()
        })
    }
    //字符串转驼峰形式
    MZ.prototype.toCamelCase = function (str) {
        if (!this.isString(str)) return
        //以空格、-、_ 连接的字符串   Some_database_field_name ==> someDatabaseFieldName
        return str.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2) {
            // console.log(match) // S _d _f _n
            // console.log(p1)  // ^([A-Z]) S undefined undefined undefined
            // console.log(p2) // [\s-_]+(\w) undefined d f n
            // console.log(offset) //位置
            return p2 ? p2.toUpperCase() : p1.toLowerCase()
        })
    }
    //驼峰转字符形式
    MZ.prototype.disCamelCase = function (str, symbol) {
        if (!this.isString(str)) return
        var _symbol = symbol || '-'
        return str.replace(/([A-Z])/g, function (match, p1, offset) {
            // console.log(match) //S D F N
            // console.log(p1) //S D F N
            // console.log(offset)
            return offset === 0 ? p1.toLowerCase() : _symbol + p1.toLowerCase()
        })
    }
    MZ.prototype.replaceAll = function (str, findTxt, replaceTxt) {
        if (!this.isString(str) || !this.isString(findTxt) || !this.isString(replaceTxt)) return
        return str.replace(new RegExp(findTxt, 'g'), replaceTxt)
    }
    //格式化字符串
    MZ.prototype.format = function (str, size, symbol) {
        if (!this.isString(str) || !this.isNumber(size)) return
        var _symbol = symbol || ','
        var arr = this.chunk(str.split(''), size)
        return map.call(arr, function (item, index) {
            return index === arr.length - 1 ? item.join('') : item.join('') + _symbol
        }).join('')
    }
    //去除空格  type 1-所有空格(默认)  2-前后空格  3-前空格 4-后空格
    MZ.prototype.trim = function (str, type) {
        if (!this.isString(str)) return
        var _type = type || 1
        switch (_type){
            case 1: return str.replace(/\s+/g, '')
            case 2: return str.replace(/(^\s*)|(\s*$)/g, '')
            case 3: return str.replace(/^\s*/g, '')
            case 4: return str.replace(/\s*$/g, '')
            default: return;
        }
    }
    //取字符串(数组)中最长的单词 (第一次出现)
    MZ.prototype.longestWord = function (arg, symbol) {
        if (!this.isString(arg) && !this.isArray(arg)) return
        var _symbol = symbol || /\s+/g || ' '
        var arr = this.isString(arg) ? arg.split(_symbol) : arg
        return reduce.call(arg.split(_symbol), function (result, item) {
            return item.length > result.length ? item : result
        },'')
    }
    //判断字符串(数组)以val 开头  val String or Array
    MZ.prototype.startWith = function (arg, val) {
        if (!this.isString(arg) && !this.isArray(arg)) return
        return this.isString(arg) ? arg.substr(0, val.length) === val : arg[0] === (this.isArray(val) ? this.arrToStr(val) : val)
    }
    //判断字符串(数组)以val 结尾  val String or Array
    MZ.prototype.endWith = function (arg, val) {
        if (!this.isString(arg) && !this.isArray(arg)) return
        return this.isString(arg) ? arg.substr(arg.length - val.length) === val : arg[arg.length - 1] === (this.isArray(val) ? this.arrToStr(val) : val)
    }
    //字符串转数组 根据字符 默认为空
    MZ.prototype.strToArr = function (str, symbol) {
        if (!this.isString(str)) return
        var _symbol = symbol || ' '
        return str.split(_symbol)
    }
    //字符串转对象
    // key1=value1&key2=value2 ==> { key1: value1, key2: value2 }
    // strToObj('key1|value1&key2|value2','|')==> { key1: value1, key2: value2 }
    MZ.prototype.strToObj = function (str, symbol) {
        if (!this.isString(str)) return
        var _symbol = symbol || '&'
        return this.arrToObj(this.strToArr(str, _symbol))
    }
    //常用在 url 参数转对象
    //key1=value1&key2=value2 ==> { key1: value1, key2: value2 }
    MZ.prototype.parseQuery = function (str) {
        if (!this.isString(str)) return
        return this.arrToObj(this.strToArr(str, '&'))
    }
    MZ.prototype.JSONToObj = function (json) {
        return JSON.parse(JSON.stringify(json))
    }

    //对象
    //扩展对象(只针对obj 和 obj)extend( [deep], target, object1 [, objectN ] )
    MZ.prototype.extend = function () {
        var deep = false
        var target = arguments[0] || {}
        var i = 1
        var option, src, copy, copyIsArray
        //如果第一个参数是bool, target为第二个参数
        if (this.isBoolean(target)){
            deep = target;
            target = arguments[1] || {}
            i = i + 1
        }
        //如果target不为object不能进行复制
        if (!this.isObject(target)){
            target = {}
        }
        for (; i < arguments.length; i++){
            option = arguments[i]
            // 要求不能为空 避免extend(a,,b)这种情况
            if (!this.isNull(option)){
                for (var key in option){
                    src = target[key]
                    copy = option[key]
                    //解除循环引用
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (this.isObject(copy) || (copyIsArray = this.isArray(copy)))){
                        if (copyIsArray){
                            var clone = src && this.isArray(src) ? src : []
                        }
                        else {
                            var clone = src && this.isObject(src) ? src : {}
                        }
                        this.extend(deep, clone, copy)
                    }
                    else if (!this.isUndefined(copy)){
                        target[key] = copy
                    }
                }
            }
        }

        return target
    }
    //数组对象 字符串等等 克隆复制
    //clone([deep],target)
    MZ.prototype.clone = function () {
        var deep = false
        var target = arguments[0]
        if (this.isBoolean(target)){
             deep = target
            target = arguments[1]
        }
        if (!this.isArray(target) && !this.isObject(target)){
            return target
        }
        else {
            var _result = this.isArray(target) ? [] : {}
            if (deep){
                if (JSON){
                    _result = JSON.parse(JSON.stringify(target))
                }
                else {
                    for (var key in target){
                        _result[key] = this.isObject(target) ? this.clone(deep, target[key]) : target[key]
                    }
                }
            }
            else {
                for (var key in target){
                    _result[key] = target[key]
                }
            }
            return _result
        }
    }
    MZ.prototype.objToStr = function (obj) {
        if (!this.isObject(obj)) return
        return JSON.stringify(obj)
    }
    //对象转数组 第二参数为拼接符(默认为 = )
    //obj={a:1,b:2,C:3} ==> ["a=1","b=2","c=3"]
    MZ.prototype.objToArr = function (obj, symbol) {
        if (!this.isObject(obj)) return
        var _result = []
        var _symbol = symbol || '='
        for (var key in obj){
            _result.push((key + symbol + obj[key]).toString())
        }
    }
    //常用于对象转url参数
    //{ key1: value1, key2: value2 } ==> key1=value1&key2=value2
    MZ.prototype.querify = function (obj) {
        if (!this.isObject(obj)) return
        var _result = ''
        for (var key in obj){
            _result += (key + '=' + obj[key]).toString() + '&'
        }
        return _result.slice(0, -1) //去除最后一个&
    }




    //随机
    //返回数组(字符串)中的随机一个
    MZ.prototype.randomAEle = function (arg) {
        if (!this.isArray(arg) && !this.isString(arg)) return;
        // return this.isString(arg) ? arg.substr(Math.floor(Math.random() * arg.length), 1) : arg[Math.floor(Math.random() * arg.length)]
        var randomIndex = Math.floor(Math.random() * arg.length)
        return slice.call(arg, randomIndex, randomIndex + 1)
    }
    //生成随机码 指定长度
    MZ.prototype.randomStr = function () {
        //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
        return Math.random().toString(36).substr(2)
    }
    //随机一个颜色
    MZ.prototype.randomColor = function () {
        return '#' + Math.random().toString(16).substring(2).substr(0,6)
    }
    //随机一个数字(带范围)
    // 不带参数--返回0-10(不包含10的随机数)
    // 一个参数--返回0-val(不包含val的随机数)
    //两个参数-- 返回期间范围数字
    MZ.prototype.randomNumber = function () {
        var _len = arguments.length
        switch (_len){
            case 1: return Math.floor(Math.random() * arguments[0])
            case 2: return Math.floor(Math.random() * (arguments[1] - arguments[0]) + arguments[0])
            default: return Math.floor(Math.random() * 10)
        }
    }

    //字符串验证
    MZ.prototype.validate = {
        Reg : {
            //必须
            require : /.+/,
            //email
            email : /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            //ip
            ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
            //电话号(传真)
            tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
            //手机号
            phone: /^1[3|4|5|7|8][0-9]{9}$/,
            //url 地址
            url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
            //英文
            english: /^[A-Za-z]+$/,
            //中文
            chinese: /^[\u0391-\uFFE5]+$/,
            //身份证号码
            identityNum: /\d{15}(\d\d[0-9xX])?/,
            //数字
            number: /^\d+$/,
            //整数
            integer: /^[-\+]?\d+$/,
            QQ: /[1-9]\d{4,}/,
            //用户名 A-Za-z0-9_-中文
            userName: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/,
            //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            passWord: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        },

        require: function (str) {
            return this.Reg.require.test(str)
        },
        email: function (str) {
            return this.Reg.email.test(str)
        },
        ip: function (str) {
            return this.Reg.ip.test(str)
        },
        tel: function (str) {
            return this.Reg.tel.test(str)
        },
        phone: function (str) {
            return this.Reg.phone.test(str)
        },
        url: function (str) {
            return this.Reg.url.test(str)
        },
        english: function (str) {
            return this.Reg.english.test(str)
        },
        chinese: function (str) {
            return this.Reg.chinese.test(str)
        },
        identityNum: function (str) {
            return this.Reg.identityNum.test(str)
        },
        number: function (str) {
            return this.Reg.number.test(str)
        },
        integer: function (str) {
            return this.Reg.integer.test(str)
        },
        QQ: function (str) {
            return this.Reg.QQ.test(str)
        },
        userName: function (str) {
            return this.Reg.userName.test(str)
        },
        passWord: function (str) {
            return this.Reg.passWord.test(str)
        }
    }




    //公用函数
    MZ.prototype.publicFun = {
        sortSTBFun: function (value1,value2) {
            if (value1 < value2){
                return -1;
            }
            else if (value1 > value2){
                return 1;
            }
            else {
                return 0
            }
        },
        sortBTSFun: function (value1,value2) {
            if (value1 < value2){
                return 1;
            }
            else if (value1 > value2){
                return -1;
            }
            else {
                return 0
            }
        }
    }

    return new MZ()
})())