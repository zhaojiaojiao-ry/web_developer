# Recat

## JSX

React强调将渲染逻辑和ui放在一起。通过components将markup和logic放在同一个文件里。

React不要求一定使用JSX，但这样表达更方便。

### 嵌入表达式

可以将js表达式（可能是变量、函数调用、对象属性等）放在{}中，嵌入到jsx表达式中，做html元素的内容、属性等。
通常建议将jsx表达式放在()中。
jsx表达式也可以作为js表达式使用，如赋值给变量、当做函数参数、当做函数返回等等。

``` 
const element = (
    <h1 id={id}>hello {user}</h1>
);
```

使用驼峰命名法。

jsx可以表达成React.createElement()的调用。

## 元素elements

元素定义了React应用中最小的building block。

React DOM负责根据React元素的定义来更新DOM。

ReactDOM.render()：将React元素渲染到一个root DOM node中。

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

如何修改UI，创建一个新的React元素，并调用ReactDOM.render()重新渲染。

React只会重新渲染新页面和老页面不同的地方。

可以用let xxx;定义变量xxx，然后将元素保存在变量中，通过{xxx}方式使用变量内容。

在元素内容中可以嵌入js表达式，表达式可以包含&&，?:等运算符。

## 组件components和属性props

组件类似于js的函数，接收input(props)，返回一组React元素elements。组件内可以使用props.属性名的方法访问属性。

组件名用大写字母开头。

在组件内，是不允许对props做修改的。

组件可以通过下面两种方式定义：函数or类。

### 用js函数定义组件
组件就是函数，函数接收参数props，函数返回的是需要渲染的内容。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 用es6类定义组件
组件就是类，类中有render方法，方法返回需要渲染的内容。

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

函数->类：类要extends React.Component，类中要有render()方法，将原来函数中的内容放到render方法中，将对props的使用改成this.props。

用类定义的组件中，可以包含state对象。

```
class Clock extends React.Component {// 组件Clock类
  constructor(props) {// 构造器，需要调用父类的构造，需要初始化state对象 step1
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {// 组件类启动完，完成了组件render后，自动调用  step3 定时触发step4
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {// 组件类停止时，自动调用
    clearInterval(this.timerID);
  }

  tick() {  // step4，自动触发step5
    this.setState({// 修改state一定用setState，不是this.state=，后者只有在构造器中可用
      date: new Date()
    });
  }

  render() {// ReactDOM.render时调用组件的render方法，组件内this.state发生变化时也会自动调用组件render方法 step2完成后hook触发step3，step5
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

state的更新是异步的，所以不能依赖当前state的值来计算下一个state的值。用下面这种方式。

```
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment    // prevState是前一个state
  };
});
```

组件独立管理它的state。对组件的调用方来说，它并不知道组件是否是stateful的。组件可以将state以props的形式传递给下游的组件使用。

### 渲染组件
元素可以表示DOM标签，也可以表示用户自定义的组件。（可以理解成表达式的右端可以是flat的元素，也可以是组件的调用返回的元素）

元素中可以调用其他元素。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;  // 通过props.name可以得到调用组件时传入的名为name的属性值Sara
}

const element = <Welcome name="Sara" />;// 此时会将name="Sara"保存到props对象中，发送给Welcome组件
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 事件处理

可以在元素的tag上指定事件属性=事件处理函数。这个处理函数可能是普通函数，可能是类中的方法。

```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);// 将handleClick方法的this变量绑定为Toggle类的this
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>   // button的onclick事件调用this.handleClick方法处理，这个this是button
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

如果事件处理方法有参数
```
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 为什么需要var that=this或者bind(this)

在函数调用时，this引用的对象是在变化的。

如函数嵌套时，外层函数的this是被点击的元素，内层函数的this是遍历的每个content元素，如果内层还想使用外层的this，就需要借助that变量了。

```
$(‘#content').click(function(){
    //this是被点击的id为content的元素
    var that = this;
    $(‘.content').each(function(){
    //this是class为content的元素列表中遍历到的一个元素
    //that仍然是刚才被点击的id为content的元素
    });
});
```

如类中的方法被外部调用时，方法中的this不一定是当前类的对象实例。如Toggle类中<button onClick={this.handleClick}>，这个this是button。
那如果不bind(this)，那进入handleClick方法后，this.setState会查找不到这个方法。只有将this.handleClick的this变量绑定到Toggle类的this，
才能正确执行handleClick方法内的命令。

也可以看下面这个例子。
```
this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

## list

### 如何渲染list

如下可以遍历数组，并通过map得到数组中元素number，渲染到li标签中。
```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

### 什么是key属性

key属性帮助React识别元素。比如下面的例子，使用数据中id属性做key，或者使用数组下标index做key。

```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

在所有兄弟中，key属性必须是唯一的。

key属性无法在组件内获得，如果需要在组件内获得还是需要用props。

## 组成

可以通过props.children得到子元素。一个组件的子节点内容会被保存到props.children中。

## PropTypes与defaultProp

使用propTypes属性来检查其他属性的类型。

通过defaultProp属性为其他属性指定默认值。


# React Router

React Router库：向应用中快速添加视图和数据流，同时，保持页面与URL同步。

## 使用方法

```
<Router>
    <Route>
        <Route></Route>
        ...
    </Route>
    ...
</Router>

```

1. <Route>是什么？
通过<Route>，指定path，和处理path的component。
path中可以用如/xxx/:id的方式将url=/xxx/123中的对应内容123注入到this.props.params.id属性中。
当然，也可以直接通过this.props.location.query.xxx从url中获取xxx参数的值。

2. <Route>的嵌套？
通过<Route>嵌套<Route>，维护了component之间的嵌套和父子关系，这样父component渲染时可以通过this.props.children来渲染子component。

3. IndexRoute是什么？
通过<IndexRoute>中的component可以为父<Route>设置默认页面。

4. 相对路径和绝对路径？
<Route>中的path可以使用相对路径或绝对路径（以/开头），但component的嵌套父子关系一直是有效的。

5. exact的作用是什么？
<Route>中的exact属性用来表示精确匹配。

6. <Switch>的作用是什么？
如果多个<Route>并列但外层没有<Switch>，则所有匹配上的<Route>会依次渲染。
如果多个<Route>并列但外层有<Switch>，则只有第一个匹配上的<Route>会渲染。

7. history是什么？？



