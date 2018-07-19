# Servlet

## servlet
web服务器：接收http请求，查找并返回静态资源。如apache。

servlet容器：如果web服务器想使用应用程序返回动态的结果，那么应用程序叫做servlet，servlet的实例化和运行依赖于一个容器，叫servlet容器。如tomcat，tomcat也有基础的web服务器功能，所以tomcat可以直接部署使用。

客户端->http请求->web服务器（静态页面、servlet容器(servlet)）

客户端<-http相应<-web服务器（静态页面、servlet容器(servlet)）

1个servlet容器中可以存在多个servlet实例。

如何实现一个servlet？实现Servlet类，主要实现service方法。或者继承HttpSerlvet，主要实现doGet、doPost方法。

如何实现一个web应用程序？实现一到多个servlet，准备静态文件如html，完成web服务配置xml。

## 线程安全

默认一个servlet只会生成一个实例。

当一个请求达到servlet容器时，会使用一个线程处理请求，多个线程可能访问同一个servlet实例。

### 变量的线程安全

servlet如果有成员变量或类变量，那么是多线程共享的。

解决方法：成员变量改为局部变量；操作变量时保证互斥（影响性能）。

session数据是需要保证互斥访问的。

### 如何控制serlvet的多线程？tomcat的线程池？

tomcat容器是如何使用线程的？

> client和server通过tcp三次握手建立连接后，请求会放到接收队列里。

> Acceptor从接收队列里取出连接，交给空闲的Worker线程处理。

> Worker线程在连接中获取数据，生成request对象，调用servlet实例进行处理，得到response对象。

什么是连接和请求？

> 连接：TCP层面，socket。

> 请求：HTTP层面，依赖于TCP连接实现。

> 一个连接中可能传输多个请求。

> 长连接：连接建立之后，一次传输完成不会立刻断开，之后可以复用这个连接继续传输数据，如果超过一定时间没有数据才会断开。
所以在这个长连接的过程中，不是一直都有有效请求传输的。

阻塞IO和非阻塞IO有什么不同？

> 阻塞IO（BIO）：Acceptor+Worker。当工作线程被分配了一个socket连接之后，循环执行socket.read()和socket.write()，直到socket关闭。
因为长连接的缘故，会导致socket超时才关闭。所以这个循环等待的时间较长，且可能只是socket连接没有断，但其中根本没有有效的可读数据，
所以工作线程根本没有在做有效的读和写，白白占用了工作线程。这样会导致处理的socket并发度不会超过Worker线程池的大小。
Acceptor在查找空闲Worker线程时，因为所有工作线程都被占用，所以Acceptor读取连接发给下游（Worker）的过程会阻塞。

> 非阻塞IO（NIO）：Acceptor+queue+Poller+Worker。中间的Poller会对socket进行注册和筛选，有效的socket才会交给Worker线程处理。
无效的socket在Poller中等待着。这样当socket内没有有效数据或者正在等待关闭时，不会占用工作线程。
因此处理的socket并发度不受Worker线程池大小的限制。
Acceptor不直接查找空闲的Worker线程，而是将连接发给Poller（通过一个queue）。Acceptor读取连接发给下游（Poller）的过程是不阻塞的。

对应的有几个参数可以设置：

> acceptCount：接收队列的大小。队列大小超过acceptCount后到达的请求直接丢弃。默认100。

> maxConnections：最大连接数，socket数。建立的连接数超过maxConnections时，Acceptor会阻塞从接收队列中读取连接，
这样可以控制Acceptor转给Worker的socket数量。对于非阻塞IO模式，默认10000。

> maxThreads：Worker工作线程池大小。默认200。

参考文章：

http://www.importnew.com/27309.html


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



## MVC

model：模型，描述业务实体和逻辑。java bean

view：视图，决定如何展现业务实体数据到前台。jsp

controller：控制器，请求处理、对模型的使用。servlet

client->controller->model

controller->view

view->model

view->client





















