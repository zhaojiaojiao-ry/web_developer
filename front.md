## 后端MVC与前端MVVC
后端是否还是mvc？现在后端的v层已经很薄了。主要是c负责路由，m负责逻辑处理和持久化。v层就是c层返回的json数据，而没有和前端的实现方式绑定，也没有和前端视图绑定。但json数据层次的定义如果能利于前端定义m层，是不是更理想？所以了解前端的人能更好的定义前后端的api接口。

前端mvvc是指什么？model-view-viewmodel。model是前端处理的模型，和后端返回的json数据基本对应，通过js定义class来实现。view是渲染部分，通过html和css来实现。viewmodel就是将view和model双向绑定，这样view的变化可以表现在model中，如填写表单的内容可以表现在model中方便传递给后端；model的变化可以表现在view中，如后端返回的数据可以直接展现在页面中。

后端mvc与前端mvvc？既然后端的v层已经退化，后端的v层相当于移到了前端，就是前端的mvvc。

## React是什么？
如果单说裸写React，其实是view层，通过component的概念，将渲染时使用的html和页面逻辑js融合在一起，也就是jsx的表达方式。并没有单独的提出model的概念。

所以有了一些框架，如Redux、MobX、Santa。提出了model的概念。这样React+Redux的模式，可以定义model，并将model提供给react中定义的component（类似裸写react时，将props提供给component），让component处理model，生成view。
Plain Text
const render = (model) => DOM

## MobX是什么？
MobX做到了什么？MobX可以指定变化的源数据和根据源数据变化的衍生数据，当源数据变化时可以保证衍生数据同时变化。

MobX+React？实现了MVVC。用MobX标识的model发生变化，则使用model的React view会自动变化，达到model->view。反之，在React view中使用事件回调方法对model中做修改，达到view->model。

MobX+React中重要的元素有什么？
建立数据model，数据Class包含数据源的内容。其中会变动的源数据标识成@observable，衍生的（跟随源数据变化而变化的）get数据方法标识成@computed。
建立React component，组件Class包含UI展示的组件。入口组件的入参props是第1步中建立的数据model。组件类标识成@observer。@observer的作用是将组件类的render方法设置成MobX中的autorun，这样只要@observable标识的数据有变化，@observer标识的组件类的render方法就会自动被调用，完成自动渲染。

参考：https://mobx.js.org/getting-started.html

## ECMAScript6
ECMAScript是什么？ES是一种脚本语言规范，最初的ES是按照Javascript产生的。可以说Javascript是ES规范的一个实例。最基础的Javascript语法实际上就是ES3版本规定的。目前ES已经升级到了ES6版本。

Babel转码器？这个转码器可以将ES6的代码转成ES5的代码，从而用ES6规范来写代码，并可以在只支持ES5的环境中执行。如map的箭头函数（ES6)可以被转成map的普通函数。

ES6中提供了哪些主要语法？
let、const：let声明局部变量，优先于var使用。
函数：函数参数支持默认值
Map、Set数据结构
Class类，等同于ES5的构造函数：Class中包含constructor构造器和其他方法。
需要注意this的指向，可以通过bind绑定保证this指向定义方法的类实例。
可以在方法上指定get、set关键词加上属性名，来自定义属性的getter和setter行为，this.属性名的表达方式会自动调用对应属性有get或set关键词的方法。
可以通过extends实现类的继承。可以用super关键词调用父类的方法。
Module模块
import、export：通过export变量、函数、类，来向外部提供对应接口。通过import指定从哪个module文件导入哪些变量、函数、类。

参考：http://es6.ruanyifeng.com/#README

