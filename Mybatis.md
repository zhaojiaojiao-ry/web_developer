# Mybatis

## Mybatis是什么

一个持久层的框架，支持自定义SQL、存储、映射。通过xml配置、java注解，完成持久层操作。

## SqlSession相关

SqlSessionFactoryBuilder：SqlSessionFactory的builder。生命周期：实例、使用、丢弃即可，适合做方法范围的局部变量。

SqlSessionFactory： 生产SqlSession的工厂。通过SqlSessionFactoryBuilder，读取xml配置或者java代码来构建。生命周期：和应用的生命周期同步，适合做单例。
xml配置文件中可以定义：

> environments：环境相关配置，如jdbc的连接地址。如果配置了多个环境，每个SqlSessionFactory实例只能使用一个。

> properties：一些配置属性keyvalue，如environments中配合的jdbc连接地址属性，value可以通过占位符定义，从指定的resource文件中读取具体值。

> settings：一些配置项的keyvalue对，常用key有：
>> mapUnderscoreToCamelCase： =True时可以将DO中的驼峰命名和DB的下划线命名自动映射。
>> useGeneratedKeys：=True时可以将插入记录的自增列的值返回。会配合keyProperty使用，指定自增列对应的DO属性名。这个设置需要DB本身支持，mysql是可以的。
>> defaultFetchSize：返回的结果集记录个数限制。
>> defaultStatementTimeout：等待DB返回的超时时间。

> typeAlias：java类型的别名，为了简化拼写。alias=别名，type=原始类型（全限定类名）。也可以用package name=包名，会检索包中的全部bean，给对应类注册上别名，别名是小写的类名。
对于常用的java类型，有一些内置的别名，如int-Integer。

> typeHandler：负责JDBC数据类型和Java数据类型之间的映射。

> mappers：resource=定义Mapper的xml文件路径，class=定义Mapper的全限定类名，package name=要搜索Mapper的包名（包中所有接口都会注册成Mapper）

## 定义Mapper的xml文件

### select

可用的属性：

* id： 对应Mapper接口中的方法名。

* parameterType：入参的类型（可以是typeAlias，也可以是全限定类型名），入参用于动态sql，如where id=#{id}，其中#{id}就是入参。这个参数可选，因为Mybatis可以使用TypeHandler自动识别类型并转换。
如果入参是基础类型，会直接赋值；如果入参是对象，会查找对象对应的属性来赋值。

* resultType：返回类型（typeAlias或全限定类型名），如果返回的是collection，不是用collection类型，而是用collection内元素的类型。如hashmap，代表将返回的列名和值以map方式存储。
如指定的类名，代表将返回的列值赋值给同名的属性（内部其实是通过resultMap实现的，不过没有显式声明），如果不同名可以通过SQL中的as修改列名。

* resultMap：返回类型是一个自定义的resultMap。resultType和resultMap使用一个就好。

### insert/update/delete

#### 可用的属性：

* id：对应Mapper接口中的方法名。

* parameterType：入参的类型（可以是typeAlias，也可以是全限定类型名），入参用于动态sql，如where id=#{id}，其中#{id}就是入参。这个参数可选，因为Mybatis可以使用TypeHandler自动识别类型并转换。

* useGenerateKeys：只在insert和update可用。获取db自增的key值。

* keyProperty：只在insert和update可用。定义将getGenerateKeys返回的keyvalue设置到哪个属性中。如果有多列返回，可以用逗号分隔属性名。

#### 如果想插入多条数据：

数据存放在list中。通过<foreach item="item" collection="list" separator=","> 来定义，代表从list类型的集合中获取元素item，用#{item.属性名}获取对应值，每个foreach标签内的内容用逗号分隔。

### sql

用来定义可复用的SQL代码片段。在select/insert/update/delete的具体语句中，可以通过<include refid='xxx'>指定要引用的<sql>。

### resultMap

显式定义resultMap，定义某个类的属性和db列之间的映射关系。
```
<resultMap id='xxx' type='类名'>
    <id property='属性名' column='列名'> // id唯一标识一个result对象，用途是有助于caching的性能和内嵌result mapping的性能
    <result property='属性名' column='列名'>
</resultMap>
```

### 动态SQL

* if：定义<if test='条件'>内容</if>，决定是否在SQL中增加if内容部分，条件通常是对入参的判断。

* choose, when, otherwise：起到if, else if, else的效果。

* where：避免hardcode的where冗余，使用<where>标签。

* trim：起到trim冗余的作用，prefix/suffix表示增加什么样的前缀/后缀，prefixOverrides/suffixOverrides表示忽略什么样的前缀/后缀。

* set：避免harcode的set冗余，在update语句中使用<set>标签。

* foreach：常用item，index，collection，open，separator，close属性。可以用来遍历java中的Iterable对象，包括list/set/map/array。如果是array，index是下标数字，value是数组值；如果是map，index是key，item是value。

## 日志

Mybatis支持多种日志框架，会逐一扫描工程中是否有对应日志的jar包和配置，决定使用哪种框架记录日志。、

## Mybatis开发的基本步骤

1. 提供mybatis.xml文件，配置settings等。

2. 定义Mapper接口，主要方法。

3. 为每个Mapper接口提供xml文件，文件中操作id和接口方法名相同，操作入参类型和接口参数类型相同。

# Springboot和Mybatis的结合

## 自动配置

使用mybatis-spring-boot-starter，可以：

1. 自动检测存在的datasource。

2. 使用上述datasource生成一个SqlSessionFactory实例。

3. 通过SqlSessionFactory创建SqlSessionTemplate实例。

4. 自动扫描mappers，将mappers与SqlSessionTemplate连接，并将mappers注册到spring context中用于注入。
会自动扫描有@Mapper注解的接口。

5. mybatis的配置参数写在application.properties中，以mybatis为前缀。

## 测试

使用mybatis-spring-boot-starteer-test，可以：

1. 对于MapperTest类，使用@RunWith(SpringRunner.class)和@MybatisTest注解，自动配置SqlSessionFactory和SqlSessionTemplate，和in-memory db。
在application.properties里配置spring.datasource.schema=classpath:import.sql。通过import.sql定义sql语句，预先向h2数据库插入测试数据。

2. 增加@AutoConfigureTestDatabase，使用真实db。

3. 在test包内增加一个@SpringBootApplication注解的类，避免加载真正的@SpringBootApplication类，导致问题。https://stackoverflow.com/questions/42722480/jdbctest-detect-class-annotated-springbootapplication
