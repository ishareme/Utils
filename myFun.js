var emptyArray = []
var concat = emptyArray.concat
var filter = emptyArray.filter
var slice = emptyArray.slice

function MyFun() {

}

//数组

//判断是否为数组
//如果浏览器支持数组的 isArray 原生方法，就采用原生方法，否则检测数据是否为 Array 的实例。
MyFun.prototype.isArray = Array.isArray || function (arr) {
    // return arr instanceof Array;
    return Object.prototype.toString.call(arr) === '[object Array]'
}

//这里用的是数组的 filter 方法，过滤出 item != null 的元素，
// 组成新的数组。这里删除掉 null 很容易理解，为什么还可以删除 undefined 呢？
// 这是因为这里用了 != ，而不是用 !== ，用 != 时，
// null 各 undefined 都会先转换成 false 再进行比较。
MyFun.prototype.compact = function (arr) {
    filter.call(arr, function (item) {
        return item != null;
    })
    //相当于以下代码
    // arr.filter(function (item) {
    //     return item != null;
    // })
}

//[1,[2,3],[4,5],6,[7,[89]] 变成 [1,2,3,4,5,6,7,[8,9]] ,
// 这个方法只能展开一层，多层嵌套也只能展开一层。
MyFun.prototype.flatten = function (arr) {
    return arr.length > 0 ? concat.apply([],arr) : arr;
    //相当于 [].concat(1,2,3,[4,5])
}

//数组去重。
//数组去重的原理是检测 item 在数组中第一次出现的位置是否和 item 所处的位置相等，
// 如果不相等，则证明不是第一次出现，将其过滤掉。
MyFun.prototype.uniq = function (arr) {
    filter.call(arr,function (item,index) {
        return arr.indexOf(item) === index
    })
}