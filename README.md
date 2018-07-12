# Servlet

## servlet
web服务器：接收http请求，查找并返回静态资源。如apache。

servlet容器：如果web服务器想使用应用程序返回动态的结果，那么应用程序叫做servlet，servlet的实例化和运行依赖于一个容器，叫servlet容器。如tomcat，tomcat也有基础的web服务器功能，所以tomcat可以直接部署使用。

客户端->http请求->web服务器（静态页面、servlet容器(servlet)）

客户端<-http相应<-web服务器（静态页面、servlet容器(servlet)）

1个servlet容器中可以存在多个servlet实例。

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

## MVC

model：模型，描述业务实体和逻辑。java bean

view：视图，决定如何展现业务实体数据到前台。jsp

controller：控制器，请求处理、对模型的使用。servlet

client->controller->model

controller->view

view->model

view->client

# Spring Core

## IoC容器

### 概念

IoC: Inversion of Control控制反转，由bean factory负责bean的实例化和组装，注入到依赖于该bean的其他bean中，而不是由bean自己实例化依赖的bean。

DI: Dependency Injection依赖注入。

BeanFactory: 访问spring bean容器的根接口。

ApplicationContext：BeanFactory的子接口，包含BeanFactory+额外功能。

Bean：由spring IoC容器管理（实例化、组装等）的对象。

### 容器

org.springframework.context.ApplicationContext：接口，负责实例化、配置、组装bean。通过读取配置数据（xml、java注解、java代码）决定如何管理bean。

常见实现如ClassPathXmlApplicationContext，从classpath下读取指定的xml配置文件，初始化容器。支持读取多个xml，或读取一个xml通过在xml内import来加载多个xml文件（相对路径）内的配置。

使用容器管理的bean，可以通过context.getBean()或注入注解实现。

### Bean

BeanDefinition：bean的定义，包括类名、名称、作用域、构造器、属性、注入模式、懒加载模式、初始化模式、销毁模式。

bean的命名：全局唯一id，可以显式指定，也可以不指定由容器自动生成。

bean的初始化：3种方法
>* 构造器：无参数构造器直接使用，有参数构造器属于【基于构造器的依赖注入，详见依赖部分】。
>* static factory method
>* instance factory method

### 依赖

一个bean内部依赖于其他的bean，如何建立和其他bean的关联？有以下2种方法。

>* 基于构造器的依赖注入：有参数的构造器，参数的类型和依赖的bean的类型相同。可以通过参数类型、index实现注入。

>* 基于setter的依赖注入：先调用无参数的构造器或无参数的static factory method，再调用依赖的bean的setter。所以这个时候需要提供内部依赖的bean的setter。

这2种方法怎么选择好？对必须的依赖bean使用构造器依赖注入，对可选的依赖bean使用setter依赖注入。

bean的实例化时间？单例或设置需要提前实例化的（默认）bean在container创建时就实例化了，其他bean在被请求使用时才实例化。这样有可能启动正常，但运行中因为实例化导致异常。这也是为什么spring默认bean是需要提前实例化的单例。

除了内部包含的依赖之外，一些隐含的依赖关系，可以通过depends on来限制初始化的先后顺序。

lazy-initialization：在bean被真正使用前才创建。

注入：有4种模式
>* 通过ref指定bean id
>* 通过property name查找对应name的bean
>* 通过property type查找对应type的bean
>* 通过构造器

### Bean的作用域

spring提供6种bean的作用域：
>* singleton：默认，单例，容器范围。unstateful object适合此作用域。
>* prototype：多个实例。每次这个bean被请求，或调用getBean都会得到一个新的实例。stateful object适合此作用域。
>* request：作用域和一个http request的生命周期同步，@RequestScope
>* session：作用域和一个http session的生命周期同步，@SessionScope
>* application：作用域和一个servlet context的生命周期同步，@ApplicationScope
>* websocket：作用域和一个web socket的生命周期同步

后面4种的使用条件： Only valid in the context of a web-aware Spring ApplicationContext，如XmlWebApplicationContext。

如果一个singleton bean依赖一个prototype bean，只有实例化singleton的时候会实例化一个prototype并注入，之后实例化新的prototype不会再重新注入。-如果想重新注入，需要看method injection。

如果一个长生命周期的bean中想注入一个短生命周期的bean，需要使用proxy。-需要看proxying mechanisms。

### lifecycle callbacks

允许bean在初始化和销毁时做自定义操作，@PostConstruct和@PreDestroy。

ApplicationContextAware：当ApplicationContext创建了对象实例，实例实现了ApplicationContextAware接口，那么这个实例就获得了一个ApplicationContext的引用，可以用来修改ApplicationContext。

### bean定义继承

bean之间可以定义继承关系，为了让子bean复用父bean定义的属性，减少重复设置。

### 注解

#### 注入相关注解

@Autowired：可以用在成员变量、构造器、setter方法，实现【按类型注入】。
>* 成员变量：从container中查找成员变量对应类型的bean的实例，有了这个可以省略当前bean的getter和setter。
>* 构造器：从container中查找构造器参数对应类型的bean的实例，并用这个实例来初始化当前bean的成员变量。
>* setter方法：从container中查找setter参数对应类型的bean的实例，并用这个实例来初始化当前bean的成员变量。

@Resource：可以用在成员变量、构造器、setter方法，实现【按名称注入】。

@Primary：当有多个同一个类型的bean实例时，可以通过primary标明哪个bean实例被优先用于注入。

@Qualifier：一种命名标识，可以定义bean的qualifier命名标识value，相应的可以指定注入某种类型的且qualifier命名标识value等于指定值的bean实例。也可以用于自定义注解。

#### bean定义相关注解

@Component：通用component注解。可以详细分为几类：
>* @Repository：标识持久层Data Access Object或DAO。
>* @Service：标识服务层。
>* @Controller：标识控制层。

meta注解与composed注解：meta注解是基础注解，composed注解由多个meta或composed注解组合构成。如@RestController就包含@Controller和@ResponseBody。

如何自动扫描到bean定义相关注解：
@Configuration// 注解beanconfig类
@ComponentScan(basePackages="xxx")//指定自动扫描的base包路径，该路径下的@Component类型注解的bean都能被扫描到。还可以增加正向反向过滤条件，includeFilters和excludeFilters。

在@Configuration或@Component注解的类中，用@Bean注解都能标识bean定义。更建议在@Configuration中标识bean的方法。

@Scope：表明bean的作用域。默认singleton。

@Qualifier：一种命名标识，可以定义bean的qualifier命名标识value，或者定义自定义注解。

@Import：@Configure类上可使用@Import注解import其他@Configure类。这样ApplicationContext加载时可以不用指定那么多类。

@Profile：注明bean在什么环境配置下生效。可以和@Configuration或@Bean一起使用。
设置profile的方式有：通过ApplicationContext设置；通过环境变量spring.profiles.active设置；通过@ActiveProfiles设置测试时的profile。可以同时激活多个profile。

@PropertySource：可以在properties文件中定义属性key=value，在类上用@PropertySource标识读取的properties文件，在类中用env.getProperty读取key对应的value。


#### 注解方式的ApplicationContext

AnnotationConfigApplicationContext类

## Resource

Resource指什么？classpath下、指定url下、指定文件目录下、servlet context目录下的资源。

ApplcationContext实现了ResourceLoader接口，所以通过context.getResource方法可以获取Resource。

根据ApplicaitonContext的实例类型，可以得到不同类型的Resource，如：
>* ClassPathXmlApplicationContext是从classpath下获取。
>* FileSystemXmlApplicationContext是从当前工作路径下获取。
>* WebApplicationContext是从servlet context路径下获取。
当然，通过getResource参数中资源的前缀可以强制获取不同类型的Resource，如classpath:，file:。

## Validation

创建实现Validator接口的类，对bean进行validate。Validator接口提供了supports和validate方法。ValidationUtils提供了不少校验方法。

# Spring MVC

## servlet和spring中几个容易混淆的概念

>* servlet context：这个概念和servlet有关，和spring无关。
一个web应用有一个servlet context。一个web应用包含一到多个servlet，所有servlet共享这个servlet context。
servlet context中定义了一组方法，servlet容器中的servlet可以使用这些方法和servlet容器进行通讯。
servlet context对象是web服务器中的一个已知路径的根。servlet容器在web应用加载时创建servlet context对象。

>* servlet config：在web.xml中可以对每个servlet做属性配置，web容器在实例化servlet时，会将这些属性封装到servlet config对象中使用。

>* spring mvc中的application context：在spring中，有父子appliacation context。
父application context：又称root application context，在web.xml中定义了context loader listener和context config location，会从对应的config文件里加载root application context。
把初始化好的root application context以WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE为key，放在servlet context中，供后续使用。
子application context：在web.xml中定义了servlet，在servlet内有context config location，会从对应的config文件里加载servlet的application context。加载servlet application context的时候会复用root application context中的内容。
一般将servlet间共享的（非controller相关的）bean放在父application context中，把servlet独有的（controller相关的）bean放在子application context中，这样子可以使用父中实例的bean，反过来则不行。
但是经常因为放的位置不对导致问题。springboot对这点做了简化。

>* spring boot中的application context：在springboot中只有一个application context，不用纠结了。

>* spring中的ApplicationContext和WebApplicationContext：都是spring container接口，WebApplicationContext继承了ApplicationContext接口，增加了web应用相关的ServletContext相关的方法。

>* spring mvc中哪个是serlvet，servlet和controller什么关系？spring mvc中有1个servlet-DispatcherServlet，它负责将请求发给对应的controller处理。
DispatchServlet是spring mvc的核心枢纽，即前端控制器。流程：用户发送请求 → DispatchServlet → HandlerMapping 处理器映射器（匹配与该 URL 对应的 Handler）→ DispatchServlet → HandlerAdapter处理器适配器（调用对应的 Handler 处理得到一个逻辑视图 ModelAndView）→ DispatchServlet → ViewResolver 视图解析器（渲染视图，装载数据）→ 视图返回给用户。

>* 初始化顺序：servlet context->root application context->child(servlet) application context->servlet

## Controller相关注解

@RestController=@Controller+@ResponseBody

@RequestMapping

@RequestParam：将servlet request url参数属性和方法参数绑定。默认是必须参数。可以用required标识是否必须。

@RequestHeader：将servlet request header属性和方法参数绑定。

@CookieValue：将servlet request cookie和方法参数绑定。

@RequestBody：将servlet request body反序列成对象，通过HttpMessageConverter。

@ResponseBody：将object序列化，放在response body中返回，通过HttpMessageConverter。可以和json序列化组合使用。
在实体类内用@JsonView指定getter的可见性，定义view。在Controller中用@JsonView指定使用哪种view返回。

@ExceptionHandler：在Controller类中用@ExceptionHandler标识方法，该方法可以处理controller中其他方法导致的exception。

@ControllerAdvice：如果希望定义全局的，而非controller级别的ExceptionHandler，可以定义一个类，用@ControllerAdvice标识，然后再在类内定义@ExceptionHandler标识的方法。

## HttpMessageConverter

spring有多种HttpMessageConverter实现，具体使用哪种，通过http request的content-type和response的accept属性来选择。











