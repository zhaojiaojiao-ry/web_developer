# ES6

## let

var是整个作用域的全局变量、函数内的全局变量、for循环体内的全局变量。

let是所在代码块的局部变量，对for循环来说，每层for循环有独立的let变量。

注：js中for循环的for语句和下面的代码块是两个作用域，for语句是代码块的父作用域。

## const

const是所在代码块的局部变量。一旦声明就必须设定值，一旦设定值就不可再改变。

const保证的是引用的那块内存内容不变。所以，对于对象引用而言，不变的是对象地址，对象的内容还是可以偷偷改变。

## 解构赋值

解构赋值：从数组、对象中提取值，对变量进行赋值。

两边只要结构match上，就可以提取值。如果左边的结构多余，则对应的值设为undefined或[]；如果右边的结构多余，没有影响。

左边允许设置默认值。当左边一个值通过解构，还是undefined时，会使用默认值。

```
let [a,b,c] = [1,2,3];

let [x,y,...z] = [1,2,3,4]; // x=1, y=2, z=[3,4]

let [a,b,c] = new Set([1,2,3]);

let [a,b,c=3] = [1,2];  // a=1, b=2, c=3

```

对象解构赋值，左边包含模式nameX和变量varX，左右匹配用模式，赋值用变量。

```
let {nameA:varA, nameB:varB} = {nameA:valueA, nameB:valueB};    // varA = valueA, varB = valueB

// 如果nameX和varX同名，可以简化成
let {nameA, nameB} = {nameA:valueA, nameB:valueB};  // nameA = valueA, nameB = valueB
```

解构的用途：

1. 交换变量[x,y] = [y,x]。

2. 函数返回多个值。

3. 函数参数传入多个值，如function f([a,b,c])或function f({a,b,c})。前者需要保证传入参数的顺序，后者不用保证顺序，名称匹配即可。

4. 从大json中提取部分数据。

5. 遍历Map。可以在for...of中使用。如for(let [key,value] of map)或for(let [key] of map)或for(let [,value] of map)。

6. import多个module。import {moduleA, moduleB} from xxx.js; 之后可以用moduleA和moduleB使用import进来的module。


## 函数

函数参数可以设置默认值。如果默认值非常量，而是需要计算的，那么是调用时惰性计算，而不是提前计算好的。

函数参数默认值可以和参数解构赋值一起使用。如果调用函数时没有传递指定参数，首先使用默认值，然后使用参数解构赋值。

### rest参数

...变量名：会将剩余的全部数据都放到变量名指定的数组里。

```
function add(...values) {// values是数组变量，values=[2,5,3]
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

### 函数属性

length：函数的参数个数，不包括rest参数。

name：对于非匿名函数，返回函数名称；对于匿名函数，返回被赋值的函数变量名称，而不是返回空字符串。

### 箭头函数

函数的几种定义方法
```
// 传统，非匿名函数
function f(a,b) {
    return a+b;
}

// 传统，匿名函数
var f = function(a, b) {
    return a+b;
}

// 箭头，非匿名函数
function f(a, b) => {
    return a+b;
}

// 箭头，匿名
var f = (a,b) => {
    return a+b;
}

// 箭头，匿名，只有一条命令的函数，可以省略{}和return
var f = (a,b) => a+b;

// 箭头，匿名，无参数
var f = () => {word:"hello"};
```

箭头函数的作用：

1. 简化回调函数，以map为例
```
var result = [1,2,3].map(x=>x*x); //[1,4,9]
```

2. 箭头函数中使用的this是指向定义时的对象，而不是调用时的对象。
对象方法中，如果使用箭头函数，箭头函数中使用的this是绑定到定义所在对象的。
这样就不用担心箭头函数在调用时this指向了document（在react中事件回调方法需要bind this，就是因为调用时，指向的是document而非定义时所在的对象）。

### 双冒号运算符

也是为了解决this绑定的问题。

xxx::fff(); // 调用对象xxx的fff方法，同时将fff方法中的this绑定到对象xxx上

## Promise

js提供了Promise对象。用于异步调用，比传统的事件回调方法更强大，如何强大？多回调逻辑时不再用嵌套表示，而是同步顺序表示。

通过声明Promise对象，可以指定异步调用的调用过程、调用成功执行的函数、调用失败执行的函数。

Promise对象有3个状态，执行中pending、执行成功resolved、执行失败rejected。起始状态是pending，状态一旦变成resolved或rejected，就不会再改变。
当状态变成resolved或rejected，就会调用对应的回调函数了。

如下例子，可以用一种同步的编程方式，来表达异步处理逻辑。

```
// 定义Promise对象
var promise = new Promise(function(resolve, reject) {
    // 执行异步调用，如调用后端服务
    ...
    // 判断异步调用的执行结果，执行对应的回调函数
    if (...) {
        resolve(value);// value是异步调用成功的执行结果数据
    }
    else {
        reject(error);// error是异步调用失败的错误数据
    }
});

// 调用Promise对象，调用后立即执行
promise.then(function(value) {
    console.log("call success");
}, function(error) {
    console.log("call failed");
}
);
```

一个ajax的例子。
```
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {  // 这里的this是调用方的对象，在这个例子中就是XMLHttpRequest对象
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

一个加载图片的例子。是对image的回调时间调用进行了封装呀。
外部只要知道用preloadImage并自定义resolve和reject方法就可以了，事件的绑定是preloadImage内部来做的，外部用户不用担心。

```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

一般来说，Promise对象调用完resolve或reject方法之后，对象的使命就完成了，不建议在resolve或reject之后还执行其他命令。


### then方法

调用Promise对象的then方法，可以指定对象的resolve和reject方法。then方法可以返回一个新的promise对象，所以可以链式调用下一个then。

### catch方法

调用Promise对象的catch方法，可以指定对象的reject方法。

注：一般使用then指定resolve方法，使用catch指定reject方法。因为catch中不仅可以处理reject状态，如果resolve中出现异常也会被catch捕获。

### finally方法

不论Promise对象resolve还是reject，都会调用的语句。

## Iterator接口

Iterator接口提供了数据结构遍历的统一操作。

Iterator创建一个指针对象，每次调用next方法指针指向下一个数据，并返回数据和遍历是否结束的标识。

有些内置数据类型已经实现了Iterator接口，所以可以用for...of的方式遍历。如数组、Set、Map。

自定义的数据结构也可以部署Iterator接口达到for...of的效果。Iterator接口需要部署在数据结构的Symbol.iterator属性。

## Generator函数

调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。
之后每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。next会停在有yield或return的地方。
value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

```
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
```

### 与Iterator接口的关系

Generator函数就是一个iterator生成函数，所以可以用Generator函数定义Iterable对象的[Symbol.iterator]属性。


### for...of

可以使用for (let v of myGenerator())，遍历Generator函数中定义的状态。

### Generator函数的应用场景

1. 用同步的编码方式实现异步，如ajax，执行next来触发ajax请求，执行next来获取ajax返回。

2. 多步骤的控制流逻辑。比Promise的方式语法更简单，只是增加了yield关键字。

```
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}
```

3. 类似数组的效果。通过多个yield语句定义一组数据。可以通过for...of来遍历。


## 异步调用

几种异步调用的方法：

1. 回调函数：主要问题是多个回调函数嵌套时难维护，内外层代码逻辑会相互影响。

2. Promise对象：通过then方法，将嵌套的多个回调变成链式的多个then。问题是代码比较冗余，一眼望去全是then。

3. Generator函数：通过yield达到将执行权交给其他协程的效果。除了yield关键词以外，几乎和同步操作一模一样。
Generator函数可以暂停执行、恢复执行、函数体内外的数据可以交换、可以处理错误。
暂停执行：yield
恢复执行：next
数据交换：通过next()获取Generator内部值；通过next(xx)为上一次异步任务设置返回值，返回值可以被Generator内部值接收。
处理错误：通过throw()在Generator外抛出异常，在Generator函数内通过try catch捕获并处理。

### Thunk函数

Thunk函数：如果一个函数是多参数函数且参数中有回调函数，可以将这个多参数函数替换成一个只接受回调函数作为参数的单参数函数。-这个替换后的函数就是Thunk函数。
比如以前是fff(x,y,z)，其中z是回调函数，将fff函数thunkify之后可以得到新的函数FFF，调用方法是FFF(x,y)(z)。

### Generator函数自动执行

如何使Generator函数能够自动执行，而不是手动执行next方法：

1. Generator函数内的操作必须是Thunk函数（将回调函数拆分出来了）。

2. 调用下面的run方法，完成操作的自动异步执行。

```
function run(fn) {
  var gen = fn();   // 保存Generator函数定义

  function next(err, data) {
    var result = gen.next(data);    // 调用Generator函数的next方法，得到yield语句的返回result，
                                    // 其中result.value是一个函数，接收回调函数（因为Generater函数中yield都是Thunk函数，Thunk函数的返回是一个接收回调函数的函数），
                                    // result.done表示Generator函数中所有yield是否已经执行完成
    if (result.done) return;        // 如果全部yield都执行完成就结束
    result.value(next);             // 如果还有yield没有完成，将next函数作为回调函数传入，达到继续调用next的递归效果
  }

  next();   // 调用内部的next方法
}

// Generator函数
function* g() {
  // yield异步操作，都定义成Thunk函数
}

run(g);
```

### co模块

co模块可以支持Generator函数的自动执行。

```
function* g() {
// 异步操作是Thunk函数或Promise操作
}

co(g);// 即可自动执行g方法
```

如果想达到并发异步，即某些异步操作是并发的，则将这些需要并发的异步操作定义在一个数组里，数组放在yield语句后面。

## async函数

async函数的作用和Generator函数类似。将Generator函数的function*替换成async，将yield替换成await。

async函数和Generator函数相比，优势有：

1. async函数可以自动执行，不像Generator函数需要依赖外部执行器如co。

2. async函数返回值是Promise对象，可以用then来执行异步操作。比Generator函数返回Iterator对象更方便。

### 语法

函数用async标识，异步操作用await标识。

await后可以是普通表达式，也可以是返回Promise对象的表达式。await的作用就是等待Promise被resolve或reject。
如果是普通表达式，默认会当做Promise.resolve()，立即执行。
如果是Promise对象表达式且正常执行，await的返回值是Promise resolve的value，可以直接使用，不需要Promise的then了。
如果await操作抛出了异常，可以通过try catch，将await放在try中捕获，不需要Promise的catch了。

参考：https://www.haorooms.com/post/es67application

如果需要同步执行多个异步操作。
不能串行的写多个await，这样会变成串行的异步操作的。
要写成：
```
await Promise.all([操作1,操作2,操作3]);
```
这样一看async并不是替代了Promise，而是Promise的语法糖啊。


## class

### 类的定义

```
class Student {
    constructor(name) { //构造器
        this.name = name;   // 成员属性
    }
    
    study() {   // 成员方法，不需要function关键词
    }
}

var student = new Student("xiaoming");
```

类的prototype属性依旧存在。方法都是定义在原型上的。

类的所有实例共享一个原型对象。如果没有定义在this上的属性，都是定义在原型对象上，而不是实例对象上的。

```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

### 类表达式

类名是赋值号左边的名字MyClass，不是Me。Me只在类内部可以引用。如果类内部不需要如Me.name的引用，可以省略到Me这个名字。

```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

### 类的属性和方法

#### 类的实例属性
可以直接用a=1;定义，不需要一定在constructor中。

#### 类的静态属性
用static a=1;定义，用类名+属性名调用。

#### get, set关键词

可以覆盖默认的getter和setter方法。
```
// 属性的getter
get 属性名() {
}

// 属性的setter
set 属性名(value） {
}

```
#### 类的静态方法

类方法上有static关键词，则这个方法可以通过类名+方法名调用，不能通过实例名+方法名调用。

### 类的继承
extends关键词继承。

super关键词调用父类的方法。子类必须要在constructor中调用super。

Object.getPrototypeOf(子类名)可以得到父类名，用来判断是否继承了。

super在普通方法中指向的是父类的原型，而非实例，所以不能用来调用父类实例属性。但因为父类方法都是在原型上的，可以调用。同时，调用super时，this指向的是子类实例。
super在静态方法中指向的是父类，而非父类的原型。this指向子类，而非子类实例。

## Module

export {变量/函数/类名};

export default 为模块指定默认输出，一个模块只能有一个默认输出。这样其他模块加载时可以用import 任意名字。

import {变量/函数/类名} from 模块（文件）;

### 动态执行的import

import()可以放在if等条件中动态执行。








