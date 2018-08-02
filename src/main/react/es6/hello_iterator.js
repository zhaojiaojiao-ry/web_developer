// 定义一个iterator函数
function arrIterator(arr) {
    var arrIndex = 0;
    return {
        next : function() {// 闭包！闭包包括了next方法定义，已经next方法的执行上下文。每次调用next，变量arrIndex都访问的是同一个变量，所以在增长。
            if (arrIndex <= arr.length - 1) {
                return {value: arr[arrIndex++], done: false};
            }
            else {
                return {value: undefined, done: true};
            }
        }
    };
}

var input = [1, 2, 3];

var iterator = arrIterator(input);

console.log(iterator.next());

console.log(iterator.next());

input.push(4);

console.log(iterator.next());

console.log(iterator.next());


// 再定义一个Iterable的对象
// Iterable的对象需要定义名为[Symbol.iterator]的方法
class MyArr {
    constructor(data) {
        this.data = data;
    }

    [Symbol.iterator]() {
        var data = this.data;// 获取iterator指向的数据结构内的数据，在next函数内使用。
                            // 不能在这里不保存，而在next里直接用，因为调用next的this不是MyArr实例，而是iterator实例。
        var arrIndex = 0;
        return {
            next : function() {
                if (arrIndex <= data.length - 1) {
                    return {value: data[arrIndex++], done: false};
                }
                else {
                    return {value: undefined, done: true};
                }
            }
        };
    }
}

var myArr = new MyArr([11,12,13]);
for (let myValue of myArr) {// 可以使用for...of了耶
    console.log(myValue);
}

// Map的for...of
var map = new Map();
map.set("a", 1);
map.set("b", 2);

for (let [key, value] of map) {
    console.log(key);
    console.log(value);
}

for (let key of map.keys()) {
    console.log(key);
}


// Set的for...of
var set = new Set();
set.add(11);
set.add(12);
set.add(13);

for (let setValue of set) {
    console.log(setValue);
}

// 对象的for...in
var myObj = {
  aa : 1,
  bb : 2
};

for (let attr in myObj) {
    console.log(attr);
}


