# HTML

## doctype
指明使用的html版本。

对于html5：直接用<!DOCTYPE html>，不需要指定版本，所谓"活的html版本"，也就是最新的html。
因为html会做到向后兼容。

## 基础元素与属性

html：每个网页必有。

head：包含网页信息。

> meta：页面额外信息，如charset="utf-8"代表字符编码。

> title：网页题目，显示在浏览器标签页上。

> style：可直接定义css语句。

> link：包含外部样式表。如<link rel="stylesheet" href="css文件路径">

body：包含网页展现的内容。

> h1-h6：标题。

> p：段落。

> blockquote：块引用。

> q：内联引用。

> a：链接。href="链接地址" title="hover时显示的连接描述" target="_blank"，可点击文字或图片。target="_blank"表示新开窗口打开链接
，="xxx"表示在名为xxx的窗口打开链接，默认是在当前窗口打开链接。

> em：强调。

> br：换行。

> ol/ul/li：有序列表/无序列表/列表项。

> img：图片。src="图片地址"，alt="图片无法展现时显示的描述信息"。

> table：表格，table表格、tr表格行、th表头项/td表数据项。caption属性是表名，可通过rowspan或colspan属性跨行或跨列。
list-style-type列表标识样式；list-style-image列表标识自定义图片。

## 块元素和内联元素

块元素：单独显示，内容前后各有一个换行。如p, blockquote, ol, ul, li。

内联元素：元素中的内容与包含该元素的内容放在一起。如q，em，img。

## 字符实体

html中特殊字符要使用字符实体。如<, >, &。

## 表单

关键词：name、value。

表单：form元素

> action：提交表单请求的url

> method：提交表单的http请求类型，如post

文本输入：input元素

> type：类型，如text表示文本

> name：大多数表单元素需要name属性，浏览器会将这个name和对应的value传给后端，name相当于标识

提交输入：input元素

> type：类型，如submit表示提交按钮

单选输入：input元素

> type：类型，如radio表示单选

> name：一组单选项有相同的name

> value：每个单选项有不同的value

> checked：让单选项选中，布尔属性，只写属性名即可，不需要属性值

多选输入：input元素

> type：类型，如checkbox表示多选

> name：一组多选项有相同的name

> value：每个复选项有不同的value

> checked：让多选项选中，布尔属性，只写属性名即可，不需要属性值

文本区：textarea元素

> name

> rows

> cols

下拉菜单：select+option元素

> select：菜单，name

> option：菜单选项， value

> multiple：如果有这个属性，可多选；否则，单选

标签文本：label，对input的标签文本

> for: 对应input元素的id

required属性，表单元素可以用，标识这个域在提交时必须有值，否则无法提交。


# CSS

## 基础

css中的语句叫做规则，每个规则可提供一点样式。规则包括：一个选择器（决定规则将应用到哪些元素），一个或多个属性和值。

类：将一组元素一同管理，可以将这组元素增加到一个类中。一个元素可以属于多个类。

id：将一个元素在一个页面中唯一命名。

## 选择器

元素名：所有指定元素

.类名：代表这个class的全部元素

元素名.类名：代表这个class的指定元素

\#id值：这个id对应的元素

\#id值 元素名A 元素名B 元素名C：这个id下的子孙元素C，子孙层级关系必须是A-B-C。

元素名A 元素名B 元素名C：子孙元素C，子孙层级关系必须是A-B-C。

## 字体与颜色

字体外观控制：font-family（最后一种字体要指定为一个通用字体如serif或sans-serif），font-weight，font-size，font-style。

可以在css中使用@font-face规则，安装字体。

字体大小用px、em、百分比单位指定。em和百分比都是相对父元素的字体大小。建议在body中用关键词如small设定字体，在子元素中用相对值设定字体。

## 继承

对于某些元素的某些属性，子元素可以继承父元素的属性。当然，子元素也可以覆盖父元素的属性。

## 盒模型

每个元素都有一个盒模型，包括：

内容区：元素内容。

内边距：内容区与边框之间。

边框：元素的背景会在边框内显示。

外边距：边框外，元素与元素之间的。

## <div> <span>

div：将相关的块元素归组，是一个逻辑区。如页眉、页脚。也常用于将需要共同样式的元素归组。

> text-align：是块元素对齐方式。可继承。

span：将相关的内联元素归组。

## 伪类

某些元素有不同的状态，如a元素。可用伪类来标识各种状态。如a:linked未访问，a:visited访问过，a:hover悬停。

## 样式的层叠

一个元素最终样式如何确定。3步走。

###第一步
按css规则来源分为有3类：

> 作者css

> 读者css

> 浏览器css

### 第二步
第一步中的每一类内，规则根据特定性从高到低排序。

特定性：3位整数：

> 百位：规则选择器每包含一个id加一分。

> 十位：规则选择器每包含一个类或伪类加一分。

> 个位：规则选择器每包含一个元素名加一分。

### 第三步
第二步中，如果每一类内，有特定性相同的规则，则按照定义的先后顺序，后定义的优先。

## 布局

### 流

决定了元素的渲染方式。

块元素：从上到下，每个元素间有换行。

内联元素：从左上到右下，只要当前行空间足够，会先从左到右渲染，如果不够则向下。

水平两个元素的外边距不会折叠。垂直两个元素的外边距会折叠。（包括嵌套元素，如果内外元素的垂直外边距碰到一起，会折叠）

### 浮动布局

float：会让float元素从正常元素流中删除，尽量的靠左或靠右显示。后面的块元素会当这个float元素不存在，重叠显示。
而内联元素会考虑这个float元素的边界，围绕它。

定义float元素时，要紧挨着布局时想要挨着的元素定义。这可能导致内容顺序问题。

如果浮动导致重叠不符合预期，可以使用什么方法解决？设置外边距；clear。

### 凝胶布局

定义固定宽度的div，外边距使用auto。可以解决浮动布局的内容顺序问题。

### 绝对布局

但绝对布局元素被完全从流中删除，不管块元素还是内联元素都察觉不到他，所以会导致覆盖。position。

### 表格显示布局

增加div表示table，增加div表示table-row，增加块元素表示table-cell。display。

### 固定定位

固定定位：相对于浏览器窗口边界。滚动页面，位置也不动的定位。position:fixed

绝对定位：相对网页边界。position:absolute

# HTML和CSS的关系

HTML：是网页结构，是人体

CSS：控制HTML的表现，是衣服和装饰
