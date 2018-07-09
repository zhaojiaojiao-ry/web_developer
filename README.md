# web_developer

## servlet
web服务器：接收http请求，查找并返回静态资源。如apache。

servlet容器：如果web服务器想使用应用程序返回动态的结果，那么应用程序叫做servlet，servlet的实例化和运行依赖于一个容器，叫servlet容器。如tomcat，tomcat也有基础的web服务器功能，所以tomcat可以直接部署使用。

客户端->http请求->web服务器（静态页面、servlet容器(servlet)）

客户端<-http相应<-web服务器（静态页面、servlet容器(servlet)）

1个servlet容器中可以存在多个servlet实例