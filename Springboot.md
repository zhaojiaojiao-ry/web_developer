# Springboot

@EnableAutoConfiguration：根据依赖的jar包自动配置spring，如使用什么ApplicationContext，使用什么sevlet容器，连接什么数据库。如果想要看到实际应用了什么，可以在启动时增加--debug。可以exclude不希望自动加载的类。

bean扫描和依赖注入：可以使用spring支持的任何一种方式，推荐使用@ComponentScan扫描，使用@Autowired注入。

@SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration

application.properties：springboot应用会从哪些路径下查找application.properties文件？
1. 当前目录下的config子目录下
2. 当前目录下
3. classpath root下的config子目录下，如resources/config/application.propreties。
4. classpath root下的，如resources/application.properties
对于写在source和test中的SpringbootApplication，classpath root是什么？package的path。所以source和test中的resources可以相互利用吗？

application-${profile}.properties：通过spring.profiles.active属性决定使用哪个profile对应的配置。

springboot是如何选择数据库的？tddl和h2？

