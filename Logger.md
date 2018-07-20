# Logger

## 基础

java中常见的Logger，log4j、logback、slf4j、commons-logging，其实不是一个东西。

日志接口：定义了统一的日志接口，后面可以对接不同的日志实现。包括slf4j、commons-logging。

日志实现：日志功能的具体实现。包括log4j、logback、commons-logging内自带的简单日志实现、jdk自带的logging。

为什么要有日志接口？这样java代码只需要依赖于接口，而不需要依赖于后面的具体实现。可以随时更改使用的具体实现，而不影响代码。

## slf4j与commons-logging

如果使用了slf4j或commons-logging，代码中通过LogFactory.getLog，获得实现了Log接口的实现类。

slf4j：在编译时静态绑定真正的日志实现。如果有两个绑定了slf4j的日志实现包，可能发生冲突。

commons-logging：动态查找机制，在运行时找到真正的日志实现。基于classloader。

## logback与log4j

logback性能更优，正逐步替代log4j。

## slf4j与日志组件的桥接

![slf4j](http://img.my.csdn.net/uploads/201212/10/1355072211_8017.png)

如果使用slf4j+logback：需要包slf4j-api（slf4j接口）, logback-classic, logback-core（2个logback包实现了slf4j接口）。

如果使用slf4j+log4j：需要包slf4j-api（slf4j接口），slf4j-log4j12（适配slf4j到log4j），log4j（log4j具体实现）。

注意：log4j-over-slf4j与slf4j-log4j12共存会导致，log4j桥接给slf4j，slf4j桥接给log4j，死循环，堆栈溢出。可以推广得到，A-B和B-A的桥接包是不能同时存在的。
