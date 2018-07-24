# Javascript

## Javascript与HTML、CSS的区别？

HTML：网页的内容和结构；

CSS：网页的外观；

Javascript：在网页中添加行为。

## 基础

定义变量：var 变量名;

变量类型：数字，布尔true/false，字符串用双引号，数组，对象，函数。

变量未初始化的话，值是undefined。

字符串用+连接

=赋值，==判断是否相等，===呢

while、if、else if、else、for：同java

内置函数prompt：可以弹窗，让用户输入，并将输入当做字符串返回。如果用户没输入，则返回null。

||、&&、！、++、--

Math.random()产生0-1的随机小数，Math.floor()将小数向下圆整为最接近的整数。

函数：java的函数调用是按值传递实参，传递的是实参的副本。函数可以return，如果不return则返回的是undefined。

在函数内使用局部变量时，要记得先声明var xxx，否则xxx会被当做全局变量来声明。

数组：声明var scores = [1, 2, 3]; var empty = []; var arr = new Array(3);。
获得长度var length = scores.length; 。
v如果访问的下标超过了数组长度，则返回undefined。
向数组中插入元素时，可以直接使用下标，也可以用push在数组尾部增加。数组中未被赋值的位置是undefined。
数组元素可以是任意类型，不要求所有元素属于同一类型。
数组的indexOf方法，可以找到数组中指定元素的下标，如果不存在则返回-1。

对象：声明var student = {name:"xxx", age:17, sex:"female", study:function() {alert.log("study");}};
访问属性student.name，或者student["name"]，如果属性没定义会返回undefined。
修改属性student.name="yyy"，如果属性不存在则会新增属性。
删除属性delete student.name;。
对象变量中保存的是对象的引用。所以如果函数的参数类型是对象，则代表是对象引用，对对象引用复制后，对属性进行的操作，实际是对原对象属性的操作，在函数外也是可见的。
访问方法student.study();。方法内调用对象属性，通过this.name；调用对象方法，通过this.study();。
可以通过for(var prop in student) {console.log(prop + student[prop])} 这种方法来遍历对象的属性。

## 交互

如何与用户交互？

提醒框：用alert方法，参数为字符串，会在浏览器弹窗显示字符串。用于警告提醒。

写入文档：用document.write方法，将内容写入网页。

控制台：用console.log，将内容写到控制台。是好的调试工具。

写入DOM：修改页面结构和内容。是好的和用户交互的方法。

## 如何在html中引用javascript

通过<script>标签，直接写代码。

通过<script src="js文件">，链接到写了代码的js文件。

## DOM

### 什么是DOM
DOM：document object model，文档对象模型。

DOM、HTML、Javascript的关系：浏览器根据HTML定义生成DOM，Javascript读取或修改DOM，浏览器可动态展示DOM。

DOM树中根节点是document对象，下面就是html中定义的各种元素了。

在Javascript中可以从document开始访问DOM树。document是全局对象。
var element=getElementId("html元素id")，可以获得html元素对象。如果没有对应id的元素，返回null。
var elemens=getElementsByClassName("html元素类")，可以获得属于这个class的全部html元素对象。
getElementsByTagName("html元素名")，可以获得这个html元素名的全部html元素对象。

html元素对象有什么用：
1. element.innerHTML，可以访问元素内容。
2. element.setAttribute，可以设置元素属性；getAttribute，可以获取元素属性。
3. element.value，可以访问元素的value属性。

注意：对DOM的使用要在页面加载之后。如何保证script在页面加载后执行？
1. 将script放到body元素最后执行。
2. 在script中定义函数xyz，然后调用window.onload=xyz，window是js的内置对象表示浏览器窗口，在window加载后才会调用xyz函数。

回调函数：window.onload这其实是回调函数。一个button元素的onclick也是回调函数。

## 类型

undefined：任何没有初始化的变量值都是undefined。

null：在应该提供一个对象但无法创建或没找到时，使用null。

typeof：typeof xxx 可以获得xxx变量的类型。

NaN：Not A Number。用isNaN(xx)来判断xx是否是NaN，而不能用xx==NaN。

### 运算

==：不要求类型一致。
1. 如果是字符串和数字比较，将字符串转换成数字，再比较。
2. 如果是布尔和另一个值比较，将布尔转换成数字，再比较。
3. undefined == null，返回true。

===：类型一致的比较。

对应的有!=和!==，但只有>=和<=。

+：如果运算数中有数字和字符串，将数字转换成字符串运算。-、*、/：将字符串转换成数字运算。

如何将字符串手动转换成数字：Number(字符串)。

判断对象是否相等，用==和===都是一样的，因为对象变量保存的是变量的引用。

js中的假值：undefined、null、0、空字符串、NaN、false。

### 字符串

字符串又是基础类型，又可以是个对象。

常用属性：length。

常用方法：trim()、toUpperCase()、charAt()、indexOf()、substring()、split()。

## 异步编码

### 事件

事件：如onload，onclick

可以为事件指定一个回调函数。

事件处理函数被调用时，将向它传递一个事件对象。事件对象包括：事件触发的元素，何时发生等信息。

```
function show(eventObj) {// eventObj是事件对象
    var image = eventObj.target;    // target属性是事件触发的元素对象
}
```

## 函数

定义函数时有不同的方法：函数声明、函数表达式、匿名函数。

### 函数声明

处理其他代码之前，先处理函数声明。

函数声明会创建一个与函数同名的变量，保存函数引用。

### 函数表达式

函数表达式中不用指定函数名。

通过var name = function() {}; 定义函数，并通过name();调用函数。name保存函数引用。

函数引用可以赋值给其他的变量，这样可以通过其他变量名达到调用函数的效果。

js中的函数可以赋值给变量；可以作为实参传递给函数如arr.sort()方法的参数就是排序函数；可以从函数中返回。

### 匿名函数

通过window.onload = function() {}; 定义函数，并直接使用。

对象中方法的定义，也是一种匿名函数吧。

### 函数返回值

当函数返回值是另一个函数时，我们究竟能获得什么？一个函数的定义，以及执行这个函数的上下文环境。- 闭包

## 闭包

函数中的变量包括：本地变量（在函数体中定义的，包括形参）、全局变量、自由变量
（非本地定义的，要从外部环境中获取，外部通常是指当前函数内嵌在另一个函数里，另一个函数就是外部）。

一个函数加上一个能敲定函数内自由变量的环境(引用环境)，共同构成了一个闭包。
如下，调用var doCount=makeCounter()得到的就是一个闭包，包括函数counter和包含counter内自由变量count的环境。
每次调用doCount();时会调用counter函数，同时使用闭包所包含的环境（使用环境中变量count的值，修改count的值）。

```
function makeCounter() {
    var count = 0;
    function counter() {
        count = count + 1;
        return count;
    }
    return counter; 
}
```

创建闭包的方法：
1. 通过函数返回函数。如上举例。
2. 函数使用了自由变量，每当在创建该函数的上下文外面执行这个函数时，都会创建一个闭包。
3. 将函数传给函数时，如果参数函数有自由变量，也会创建一个闭包。
4. 事件处理方法使用闭包。
如：
```
window.onload = function() {
    var count = 0;
    button.onclick = function() {
        count = count + 1;
    }
}
```

闭包包含的环境是实际环境，而不是副本。所以对闭包中环境中变量的修改，对于下一次对环境的使用是可见的。

## 对象

### 构造函数

一般函数名大写字母开头，通过this为属性赋值、定义方法，不用显式返回this。通过new调用构造函数。new会构造一个空对象，让构造函数中的this指向
这个空对象，对空对象赋值，并且返回this。
```
function Student(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.study = function() {
        console.log("study");
    };
}

var student = new Student("xiaoming", 17, "male");
```

在调用构造函数时，如果入参个数太多，很容易出问题。
这时候可以用一个对象字面量定义入参的名称和值，将对象字面量作为参数传给构造函数。构造函数接收对象作为参数。

通过xxx instanceOf ABC，可以判断xxx变量是否是通过ABC构造函数构造的对象实例。对象字面量是Object的对象实例。

通过构造函数构造出的对象，还可以单独增删属性、方法。修改后的对象依然是原来那个构造函数的对象。

可以定义多个同名的构造函数，但接受的参数个数不同。


### js内置构造函数

var date = new Date();

var arr = new Array();// 等价于var arr = [];









Javascript和jQuery

