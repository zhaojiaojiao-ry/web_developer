# web_developer

## servlet
web服务器：接收http请求，查找并返回静态资源。如apache。

servlet容器：如果web服务器想使用应用程序返回动态的结果，那么应用程序叫做servlet，servlet的实例化和运行依赖于一个容器，叫servlet容器。如tomcat，tomcat也有基础的web服务器功能，所以tomcat可以直接部署使用。

客户端->http请求->web服务器（静态页面、servlet容器(servlet)）

客户端<-http相应<-web服务器（静态页面、servlet容器(servlet)）

1个servlet容器中可以存在多个servlet实例
如何实现一个servlet？实现Servlet类，主要方法包括init、service、destroy。

如何实现一个web应用程序？实现一到多个servlet，准备静态文件如html，完成web服务配置xml。

## 数据库
### JDBC

java database connection

提供java api，用于访问各种不同的数据库实现，如mysql、ms sql server、orable等。

jdbc的实现用的就是manager-provider-service模式。

> service：包含数据库连接等数据库服务，如Connection。

> provider：就是驱动，实现了不同的获得数据库服务的方式，如Driver。

> manager：就是驱动管理器，提供了管理不同驱动（如注册驱动、选择驱动）的方法，如DriverManager。

### Connection

静态指令Statement：executeQuery查询，executeUpdate增删改，executeBatch批量执行。查询命令返回ResultSet，可用next()方法遍历。

动态参数化执行PreparedStatement：先定义sql模板，其中中含有?。后续填充参数内容。

### 事务

事务的隔离级别：跟多线程访问是一个道理，限制多事务对共享数据修改的级别。

关闭自动事务提交，代码中控制哪几个sql属于一个事务，手动提交事务。

### DataSource

不再需要客户端手动加载Driver和调用DriverManager.getConnection获得。

向JNDI(Java Naming and Directory)服务器（一个命名上下文）查询，获得DataSource对象，就可以getConnection了。

DataSource可以看做Connection工厂。

连接池。

## 会话

### 如何跟踪一个会话

#### session

在服务器端保存session，包含sessionid、用户的属性。两种实现方式，cookie会话和URL重写。

cookie会话：服务器发送临时cookie给客户端，cookie中包含sessionid。客户端不保存cookie，cookie在浏览器关闭后就失效。

URL重写：服务器将sessionid拼接在URL，实现跳转。

session需要在服务端持久化。用到Serialize。

#### cookie

在服务器端生成cookie，发送给客户端，客户端将cookie保存在本地。

cookie可以在多次打开浏览器的过程中复用。

## 异常处理机制

### 声明式

可以声明指定的http错误码或者java异常类名，用什么静态页面或者servlet来处理。

缺点：需要列举所有需要处理的错误码或者异常。

### 程序式

程序中try catch捕获异常，通过HttpResponse sendError，标识错误码和描述。

可以将异常统一转发给异常处理的servlet来处理，避免在多个servlet中重复实现异常处理。

## 线程安全

默认一个servlet只会生成一个实例。

当一个请求达到servlet容器时，会使用一个线程处理请求，多个线程可能访问同一个servlet实例。

### 变量的线程安全

servlet如果有成员变量或类变量，那么是多线程共享的。

解决方法：成员变量改为局部变量；操作变量时保证互斥（影响性能）。

session数据是需要保证互斥访问的。

