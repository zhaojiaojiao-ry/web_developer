# Springboot

## 自动配置、bean扫描和依赖注入
@EnableAutoConfiguration：根据依赖的jar包自动配置spring，如使用什么ApplicationContext，使用什么sevlet容器，连接什么数据库。
如果想要看到实际应用了什么，可以在启动时增加--debug。可以exclude不希望自动加载的类。

bean扫描和依赖注入：可以使用spring支持的任何一种方式，推荐使用@ComponentScan扫描，使用@Autowired注入。

@SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration

springboot是如何选择数据库的？比如单测的时候用h2，正常的时候用tddl？？？？

## application.properties
application.properties：springboot应用会从哪些路径下查找application.properties文件？
1. 当前目录下的config子目录下
2. 当前目录下
3. classpath root下的config子目录下，如resources/config/application.propreties。
4. classpath root下的，如resources/application.properties
对于写在source和test中的SpringbootApplication，classpath root是什么？package的path。所以source和test中的resources可以相互利用吗？

application-${profile}.properties：通过spring.profiles.active属性决定使用哪个profile对应的配置。

## spring, springmvc, springboot的关系？

广义的spring是一个大家族，其中spring core是核心的容器管理框架包括IoC和DI。spring core也可以算作是狭义的spring。

springmvc是基于spring core容器管理和servlet实现的mvc web应用框架。关键词：DispatcherServlet

springboot是在spring基础上支持了自动配置的一套快速开发整合包，免去了使用spring时的一堆配置。springboot并不限于mvc。
关键词：AutoConfiguration

## springboot单元测试

使用spring-boot-starter-test，不仅提供了springboot test，还提供了junit、spring test等。

### 通用

@RunWith：指定单元测试的执行类，SpringRunner类和SpringJUnit4ClassRunner类，这2个名字是同一个类。

spring的单元测试执行时，会从单元测试所在目录开始逐层往上的查找一个@SpringBootApplication注解的类。通过这个类的配置来扫描组件和mapper。
所以可以为了测试在test目录下创建一个类，而不使用src中的那个类。在这个类上可以设置@ComponentScan、@MapperScan、@EnableAutoConfiguration。
@EnableAutoConfiguration通常用exclude来排除一些Configuaration的自动配置。因为单测时，有些配置bean是不希望装载的，比如buc、acl、eagleeye。

```
@SpringBootApplication
@ComponentScan(basePackages = {"com.alibaba.alimama.flyaway.dal", "com.alibaba.alimama.flyaway.impl"},
    basePackageClasses = {com.alibaba.alimama.flyaway.web.controller.api.DemoStudentApiController.class})
@MapperScan(basePackages="com.alibaba.alimama.flyaway.dal.mapper")
@EnableAutoConfiguration(exclude = {InterceptorConfiguration.class, AclAutoConfiguration.class, EagleEyeAutoConfiguration.class, SSOFilterConfiguration.class})

```

【如何知道自动配置了哪些configuration？】通过在application.properties里配置debug=true，可以在运行时看到自动配置的列表。方便写exclude时查找名称。

spring的单元测试执行时，会从单元测试所在目录的resources下加载application.properties。所以如果单元测试需要特殊的配置，可以在这个文件中设置。
与正式运行时main/resources下的application.properteis区分。

### DAL层单元测试

@MybatisTest：并在maven中增加h2数据库的包，可以使用h2内存数据库。这个注解就自动使用了内存数据库。

为了初始化h2数据库，需要在application.properties中指定spring.datasource.schema=classpath:import.sql，并在import.sql文件中定义初始化h2数据库的sql语句。

### SERVICE层单元测试

@SpringBootTest：这样才能扫描@SpringBootApplication注解的类？实践看起来是这样的。

@MockBean：用于mock依赖的mapper等。Mockito.when(studentMapper.findByClassId(classId)).thenReturn(studentDOs);的方式可以达到mock效果。
当studentMapper对象的findByClassId方法被调用且参数为classId时，mock返回studentDOs的内容。

### Controller层单元测试

@SpringBootTest：必须要写classes？实践出来的，但为什么测试Service层DAL层就不需要呢？
```
@RunWith(PandoraBootRunner.class)
@DelegateTo(SpringRunner.class)
@SpringBootTest(classes = {MainTest.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
```

@LocalServerPort：注入，得到启动的端口。

TestRestTemplate：用来发请求。如果请求的返回是泛型，可以使用exchange方法发送请求。如下列子。

```
        ParameterizedTypeReference<ResultList<DemoStudentBO>> typeReference
            = new ParameterizedTypeReference<ResultList<DemoStudentBO>>() {};// 因为controller返回是泛型，需要这样得到类型

        ResponseEntity<ResultList<DemoStudentBO>> response = testRestTemplate.exchange
            ("http://localhost:" + port + "/demostudent/findByClassId?id=1"
                , HttpMethod.GET
                , null
                , typeReference);// 因为controller返回是泛型，要用TestRestTemplate的exchange方法

        BDDAssertions.then(response.getStatusCode()).isEqualTo(HttpStatus.OK);// 验证http status code

        List<DemoStudentBO> students = response.getBody().getData();// 获得http body
        DemoStudentBO  student = students.get(0);

        BDDAssertions.then(student.getProvinceName()).isEqualTo("beijing");// 验证http body
        BDDAssertions.then(student.getId()).isEqualTo(1);
        BDDAssertions.then(student.getName()).isEqualTo("xiaoming");
```







