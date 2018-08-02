// 定义一个Generator函数，函数以function*开头
// yield和return后面是函数包含的状态
function* myGenerator() {
    yield '123';
    yield '456';
    return '789';
}

// 调用Generator函数，但函数不会立马被执行
var f = myGenerator();
// 在调用next方法时，才会执行
// 每次执行遇到yield或return就暂停，返回对应的状态内容和是否终止的标识
console.log(f.next());
console.log(f.next());
console.log(f.next());